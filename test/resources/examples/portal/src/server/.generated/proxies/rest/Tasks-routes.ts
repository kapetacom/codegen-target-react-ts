//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from 'express';
import { createProxyRoute } from '@kapeta/sdk-proxy-route';
import { ConfigProvider } from '@kapeta/sdk-config';

export const createTasksRouter = async (provider: ConfigProvider) => {
    const router = Router();
    router.use('/api/rest/tasks', await createProxyRoute(provider, 'tasks', 'rest'));

    return router;
};
