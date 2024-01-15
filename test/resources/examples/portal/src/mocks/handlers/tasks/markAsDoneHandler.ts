import { http, HttpResponse } from 'msw';

/**
 * Mark task as done
 *
 * HTTP: POST /api/rest/tasks/tasks/:id/done
 * Response type: void
 */
export const tasks_markAsDoneHandler = http.post('*/api/rest/tasks/tasks/:id/done', () => {
    return new HttpResponse(null, { status: 200 });
});
