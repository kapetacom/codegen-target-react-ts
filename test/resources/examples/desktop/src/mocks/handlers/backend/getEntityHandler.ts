import { http, passthrough } from 'msw';

/**
 * HTTP: GET /api/rest/backend/:id
 * Response type: Entity
 */
export const Backend_getEntityHandler = http.get(
    '*/api/rest/backend/:id',

    () => {
        // TODO: Return a response of type Entity
        return passthrough();
    }
);
