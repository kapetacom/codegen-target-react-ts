import { Router } from 'express';
import { ConfigProvider } from '@kapeta/sdk-config';

import { createUsersRouter } from './proxies/rest/Users-routes';

import { createTasksRouter } from './proxies/rest/Tasks-routes';
import { createSubpageRouter } from './proxies/fragments/Subpage-routes';

export const createRoutes = async (config: ConfigProvider): Promise<Router> => {
    const routes = Router();
    routes.use(await createUsersRouter(config));

    routes.use(await createTasksRouter(config));
    routes.use(await createSubpageRouter(config));
    return routes;
};
