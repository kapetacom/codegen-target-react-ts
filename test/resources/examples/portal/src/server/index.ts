import { ConfigProvider, runApp } from '@kapeta/sdk-config';
import { createServer } from './server';
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

    // Serve static files from the assets directory
    server.express().use('/assets', express.static(ASSETS_DIR));

    // Includes the generated routes for REST and Web Fragment resources
    server.use(await createRoutes(configProvider));

    // Will serve the html, css and JS rendered by the build process
    // In development mode, this will be using hot-reload and be served from memory
    const webpackConfig = require('../../webpack.development.config');
    server.configureFrontend(DIST_DIR, webpackConfig);

    server.start('web');
}, BASE_DIR);
