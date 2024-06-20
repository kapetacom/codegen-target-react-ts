import { http, passthrough } from 'msw';

/**
 * Get all
 *
 * HTTP: GET /api/rest/users/groups/
 * Response type: string[]
 */
export const UsersGroups_getAllHandler = http.get(
    '*/api/rest/users/groups/',

    () => {
        // TODO: Return a response of type string[]
        return passthrough();
    }
);
