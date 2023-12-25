import { ConfigProvider, runApp } from '@kapeta/sdk-config';
import { createServer } from './server';
import { createRoutes } from './.generated/routes';
import Path from 'node:path';

const BASE_DIR = Path.resolve(__dirname, '../../dist');
runApp(async (configProvider: ConfigProvider) => {
    const server = await createServer(configProvider);

    server.use(await createRoutes(configProvider));
    const webpackConfig = require('../../webpack.development.config');
    server.configureAssets(BASE_DIR, webpackConfig);

    server.start('web');
}, Path.resolve(__dirname, '../../'));
