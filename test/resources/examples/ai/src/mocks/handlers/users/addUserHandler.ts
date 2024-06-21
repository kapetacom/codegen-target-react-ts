import { http, HttpResponse } from 'msw';

/**
 * Add user
 *
 * HTTP: POST /api/rest/users/users/:userId
 * Response type: void
 */
export const Users_addUserHandler = http.post(
    '*/api/rest/users/users/:userId',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
