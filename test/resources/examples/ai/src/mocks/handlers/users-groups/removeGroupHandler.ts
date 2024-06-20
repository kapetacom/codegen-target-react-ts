import { http, HttpResponse } from 'msw';

/**
 * Delete user group
 *
 * HTTP: DELETE /api/rest/users/groups/:id
 * Response type: void
 */
export const UsersGroups_removeGroupHandler = http.delete(
    '*/api/rest/users/groups/:id',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
