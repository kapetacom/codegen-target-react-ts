//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router, Request, Response, NextFunction } from 'express';
import { createProxyRoute } from '@kapeta/sdk-proxy-route';
import { ConfigProvider } from '@kapeta/sdk-config';

export const createTasksRouter = async (provider: ConfigProvider) => {
    const router = Router();
    router.use('/api/rest/tasks', await createProxyRoute(provider, 'tasks', 'rest'));

    // We need to handle errors here, because the proxy route will not handle them
    router.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const status = err?.statusCode ?? 500;
        const message = err?.message ?? err?.toString() ?? err?.name ?? 'Unknown error';
        res.status(status).json({ error: message });
    });

    return router;
};
