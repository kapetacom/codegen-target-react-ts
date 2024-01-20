import { http, HttpResponse } from 'msw';

/**
 * Add list
 *
 * HTTP: POST /api/rest/tasks/lists/:id
 * Response type: void
 */
export const TasksLists_addListHandler = http.post(
    '*/api/rest/tasks/lists/:id',

    () => {
        return new HttpResponse(null, { status: 200 });
    }
);
