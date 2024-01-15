import { http, passthrough } from 'msw';

/**
 * Add task for user
 *
 * HTTP: POST /api/rest/tasks/tasks/:userId/:id
 * Response type: Task
 */
export const tasks_addTaskHandler = http.post('*/api/rest/tasks/tasks/:userId/:id', () => {
    // TODO: Return a response of type Task
    return passthrough();
});
