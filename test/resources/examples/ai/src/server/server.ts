import { ConfigProvider } from '@kapeta/sdk-config';
import { Server } from '@kapeta/sdk-server';

/*
Allows you to adjust the creation of the kapeta SDK server.

For example, you can add additional middleware or routes to the server.

See https://github.com/kapetacom/sdk-nodejs-server for more information on the server class.

The server class is a wrapper around express, so you can use any express middleware or routes.

See https://expressjs.com/en/guide/using-middleware.html for more information on express middleware.

You can make this function async if you need to do any async initialization.

*/

export const createServer = (config: ConfigProvider): Server => {
    return new Server(config);
};
