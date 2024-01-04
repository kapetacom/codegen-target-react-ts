//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { createProxyRoute } from '@kapeta/sdk-proxy-route';
import { ConfigProvider } from '@kapeta/sdk-config';

export const createUsersRouter = async (provider: ConfigProvider) => {
    const router = Router();
    router.use('/api/rest/users', await createProxyRoute(provider, 'users', 'rest'));

    return router;
};
