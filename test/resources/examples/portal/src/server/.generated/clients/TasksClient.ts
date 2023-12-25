//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient, RestClientRequest } from '@kapeta/sdk-rest-client';
import { Task } from '../../../.generated/entities/Task';
import { Tags } from '../../../.generated/entities/Tags';

export class TasksClient extends RestClient {
    constructor() {
        super('tasks');
    }

    /**
     * Add task for user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /tasks/{userId}/{id}
     */
    async addTask(userId: string, id: string, task: Task): Promise<Task | null> {
        const result = await this.execute('POST', '/tasks/{userId}/{id}', [
            { name: 'userId', value: userId, transport: 'path' },
            { name: 'id', value: id, transport: 'path' },
            { name: 'task', value: task, transport: 'body' },
        ]);

        if (result === null) {
            return null;
        }
        return result as Task;
    }

    /**
     * Add task for user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /tasks/{userId}/{id}
     */
    addTaskRequest(userId: string, id: string, task: Task): RestClientRequest<Task | null> {
        return this.create('POST', '/tasks/{userId}/{id}', [
            { name: 'userId', value: userId, transport: 'path' },
            { name: 'id', value: id, transport: 'path' },
            { name: 'task', value: task, transport: 'body' },
        ]);
    }

    /**
     * Mark task as done
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /tasks/{id}/done
     */
    async markAsDone(id: string, headers: Any, metadata: Map<string, string>, tags: Set<Tags>): Promise<void> {
        await this.execute('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'path' },
            { name: 'headers', value: headers, transport: 'header' },
            { name: 'metadata', value: metadata, transport: 'body' },
            { name: 'tags', value: tags, transport: 'query' },
        ]);
    }

    /**
     * Mark task as done
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /tasks/{id}/done
     */
    markAsDoneRequest(
        id: string,
        headers: Any,
        metadata: Map<string, string>,
        tags: Set<Tags>
    ): RestClientRequest<void> {
        return this.create('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'path' },
            { name: 'headers', value: headers, transport: 'header' },
            { name: 'metadata', value: metadata, transport: 'body' },
            { name: 'tags', value: tags, transport: 'query' },
        ]);
    }

    /**
     * Delete task
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /tasks/{id}
     */
    async removeTask(id: string): Promise<void> {
        await this.execute('DELETE', '/tasks/{id}', [{ name: 'id', value: id, transport: 'path' }]);
    }

    /**
     * Delete task
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /tasks/{id}
     */
    removeTaskRequest(id: string): RestClientRequest<void> {
        return this.create('DELETE', '/tasks/{id}', [{ name: 'id', value: id, transport: 'path' }]);
    }
}
