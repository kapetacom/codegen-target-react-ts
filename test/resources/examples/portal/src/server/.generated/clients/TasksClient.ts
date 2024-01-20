//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient, RestClientRequest } from '@kapeta/sdk-rest-client';
import { ConfigProvider } from '@kapeta/sdk-config';
import { Task } from '../../../.generated/entities/Task';
import { Tags } from '../../../.generated/entities/Tags';

/**
 * Creates a new ready TasksClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createTasksClient(configProvider: ConfigProvider): Promise<TasksClient> {
    return new TasksClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the Tasks API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createTasksClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createTasksClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class TasksClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('tasks', autoInit);
    }

    /**
     * Add task for user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /tasks/{userId}/{id}
     */
    async addTask(userId: string, id: string, task: Task, filter?: string): Promise<Task | null> {
        const result = await this.$execute('POST', '/tasks/{userId}/{id}', [
            { name: 'userId', value: userId, transport: 'PATH' },
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'task', value: task, transport: 'BODY' },
            { name: 'filter', value: filter, transport: 'QUERY' },
        ]);

        if (result === null) {
            return null;
        }
        return result as Task;
    }

    /**
     * Add task for user
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /tasks/{userId}/{id}
     */
    addTaskRequest(userId: string, id: string, task: Task, filter?: string): RestClientRequest<Task | null> {
        return this.$create('POST', '/tasks/{userId}/{id}', [
            { name: 'userId', value: userId, transport: 'PATH' },
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'task', value: task, transport: 'BODY' },
            { name: 'filter', value: filter, transport: 'QUERY' },
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
    async markAsDone(id: string, metadata: { [key: string]: string }, headers?: any, tags?: Set<Tags>): Promise<void> {
        await this.$execute('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'BODY' },
            { name: 'headers', value: headers, transport: 'HEADER' },
            { name: 'tags', value: tags, transport: 'QUERY' },
        ]);
    }

    /**
     * Mark task as done
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /tasks/{id}/done
     */
    markAsDoneRequest(
        id: string,
        metadata: { [key: string]: string },
        headers?: any,
        tags?: Set<Tags>
    ): RestClientRequest<void> {
        return this.$create('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH' },
            { name: 'metadata', value: metadata, transport: 'BODY' },
            { name: 'headers', value: headers, transport: 'HEADER' },
            { name: 'tags', value: tags, transport: 'QUERY' },
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
        await this.$execute('DELETE', '/tasks/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }

    /**
     * Delete task
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /tasks/{id}
     */
    removeTaskRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/tasks/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }
}
