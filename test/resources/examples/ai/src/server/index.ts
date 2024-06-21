import { ConfigProvider, runApp } from '@kapeta/sdk-config';
import { createServer } from './server';
import { create as createHandlebars } from 'express-handlebars';
import express from 'express';
import { createRoutes } from './.generated/routes';
import Path from 'node:path';

// The base directory of the project where the kapeta.yml file is located
const BASE_DIR = Path.resolve(__dirname, '../../');

// The directory where the output of the build is stored
const DIST_DIR = Path.resolve(BASE_DIR, './dist');

// The directory where the public files are stored
const PUBLIC_DIR = Path.resolve(BASE_DIR, './public');

// The directory where the static assets are stored
const ASSETS_DIR = Path.resolve(BASE_DIR, './assets');

// runApp is a helper function that will load the configuration from Kapeta and then run the provided function
runApp(async (configProvider: ConfigProvider) => {
    // Create the server - see src/server/server.ts for more information
    const server = createServer(configProvider);

    // Will serve the html, css and JS rendered by the build process
    // In development mode, this will be using hot-reload and be served from memory
    const webpackConfig = require('../../webpack.development.config');
    server.configureFrontend(DIST_DIR, webpackConfig);

    // Set up templating
    const hbs = createHandlebars({
        extname: '.hbs',
        defaultLayout: false,
        helpers: {
            // Recommended helper to serialize values in handlebars
            toJSON: (obj: any) => JSON.stringify(obj),
        },
    });

    // "fix" the type of the engine to be compatible with express types
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.express().engine('hbs', hbs.engine);
    server.express().set('views', Path.resolve(__dirname, '../templates'));
    server.express().set('view engine', 'hbs');

    // Serve static files from the public directory in the root of the server
    server.express().use('/', express.static(PUBLIC_DIR));

    // Serve static files from the assets directory
    server.express().use('/assets', express.static(ASSETS_DIR));

    // Includes the generated routes for REST and Web Fragment resources
    server.use(await createRoutes(configProvider));

    // Add a catch-all route to render the main template
    server.use((req, res, next) => {
        // render the main template e.g. templates/main.hbs
        res.renderPage('main');
    });

    // Add app error handler
    server.express().use(<express.ErrorRequestHandler>((err: unknown, _req, res, _next) => {
        console.error(err);
        if (err && typeof err === 'object') {
            res.status((('statusCode' in err && err.statusCode) || ('status' in err && err.status) || 500) as number);
        }
        res.renderPage('main', { error: err });
    }));

    server.start('web');
}, BASE_DIR);
