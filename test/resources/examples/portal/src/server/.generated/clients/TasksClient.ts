//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
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
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'task', value: task, transport: 'BODY', typeName: 'Task' },
            { name: 'filter', value: filter, transport: 'QUERY', typeName: 'string' },
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
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'task', value: task, transport: 'BODY', typeName: 'Task' },
            { name: 'filter', value: filter, transport: 'QUERY', typeName: 'string' },
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
    async markAsDone(id: string, metadata: { [key: string]: string }, headers?: any, tags?: Tags[]): Promise<void> {
        await this.$execute('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: string }' },
            { name: 'headers', value: headers, transport: 'HEADER', typeName: 'any' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'Tags[]' },
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
        tags?: Tags[]
    ): RestClientRequest<void> {
        return this.$create('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: string }' },
            { name: 'headers', value: headers, transport: 'HEADER', typeName: 'any' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'Tags[]' },
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
        await this.$execute('DELETE', '/tasks/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete task
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /tasks/{id}
     */
    removeTaskRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/tasks/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
