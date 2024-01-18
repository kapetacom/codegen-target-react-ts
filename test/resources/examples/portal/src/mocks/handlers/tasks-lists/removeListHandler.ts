import { http, HttpResponse } from 'msw';

/**
 * Delete list
 *
 * HTTP: DELETE /api/rest/tasks/lists/:id
 * Response type: void
 */
export const TasksLists_removeListHandler = http.delete(
    '*/api/rest/tasks/lists/:id',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
