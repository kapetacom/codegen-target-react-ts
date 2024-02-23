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
    server.express().use(<express.ErrorRequestHandler>((err, _req, res, _next) => {
        console.error(err);
        res.status(err?.statusCode || err?.status || 500);
        res.renderPage('main', { error: err });
    }));

    server.start('web');
}, BASE_DIR);
