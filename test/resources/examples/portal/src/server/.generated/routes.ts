import { Router } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';
import { ProxyRouteOptions } from '@kapeta/sdk-proxy-route';

import { createUsersRouter } from './proxies/rest/Users-routes';

import { createTasksRouter } from './proxies/rest/Tasks-routes';
import { createSubpageRouter } from './proxies/fragments/Subpage-routes';

export const createRoutes = async (config: ConfigProvider, opts: ProxyRouteOptions = {}): Promise<Router> => {
    const routes = Router();
    const restApis = Router();
    restApis.use(await createUsersRouter(config, opts));

    restApis.use(await createTasksRouter(config, opts));
    routes.use('/api/rest', restApis);

    const fragments = Router();
    fragments.use(await createSubpageRouter(config, opts));
    routes.use('/fragments', fragments);
    return routes;
};
