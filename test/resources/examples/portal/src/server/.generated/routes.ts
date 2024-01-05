import { Router } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { ProxyRouteOptions } from '@kapeta/sdk-proxy-route';

import { createUsersRouter } from './proxies/rest/Users-routes';

import { createTasksRouter } from './proxies/rest/Tasks-routes';
import { createSubpageRouter } from './proxies/fragments/Subpage-routes';

export const createRoutes = async (config: ConfigProvider, opts: ProxyRouteOptions = {}): Promise<Router> => {
    const routes = Router();
    routes.use(await createUsersRouter(config, opts));

    routes.use(await createTasksRouter(config, opts));
    routes.use(await createSubpageRouter(config, opts));
    return routes;
};
