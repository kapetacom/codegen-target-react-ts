import { http, HttpResponse } from 'msw';

/**
 * Add user group
 *
 * HTTP: POST /api/rest/users/groups/:id
 * Response type: void
 */
export const UsersGroups_addGroupHandler = http.post(
    '*/api/rest/users/groups/:id',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
