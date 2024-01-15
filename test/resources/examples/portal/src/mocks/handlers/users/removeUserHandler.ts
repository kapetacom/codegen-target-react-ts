import { http, HttpResponse } from 'msw';

/**
 * Delete user
 *
 * HTTP: DELETE /api/rest/users/users/:id
 * Response type: void
 */
export const users_removeUserHandler = http.delete('*/api/rest/users/users/:id', () => {
    return new HttpResponse(null, { status: 200 });
});
