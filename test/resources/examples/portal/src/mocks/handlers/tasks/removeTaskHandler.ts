import { http, HttpResponse } from 'msw';

/**
 * Delete task
 *
 * HTTP: DELETE /api/rest/tasks/tasks/:id
 * Response type: void
 */
export const Tasks_removeTaskHandler = http.delete(
    '*/api/rest/tasks/tasks/:id',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
