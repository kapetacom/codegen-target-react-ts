//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient } from '@kapeta/sdk-web-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { Task } from '../../../.generated/entities/Task';
import { Tags } from '../../../.generated/entities/Tags';

export type ConfigureTasksClient = (client: TasksClient) => TasksClient;

/**
 * Creates a new TasksClient for React components.
 * The client is configured with the provided configuration function.
 *
 * It is wrapped in a useMemo hook to ensure that the client is only created once.
 */
export const useTasksClient = (configure?: ConfigureTasksClient): TasksClient => {
    return useMemo(() => {
        const client = new TasksClient();
        if (configure) {
            return configure(client);
        }
        return client;
    }, [configure]);
};

/**
 * A client for the Tasks API.
 * Use the useTasksClient hook to create a client in React.
 *
 * Use the TasksClient directly in other contexts.
 */
export class TasksClient extends RestClient {
    constructor() {
        super('api/rest/tasks');
    }

    /**
     * Add task for user
     *
     * HTTP: POST /api/rest/tasks/tasks/{userId}/{id}
     */
    async addTask(userId: string, id: string, task: Task, filter?: string): Promise<Task | null> {
        const result = await this.$execute<Task>('POST', '/tasks/{userId}/{id}', [
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
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /api/rest/tasks/tasks/{userId}/{id}
     */
    addTaskRequest(userId: string, id: string, task: Task, filter?: string): RestClientRequest<Task | null> {
        return this.$create<Task>('POST', '/tasks/{userId}/{id}', [
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'task', value: task, transport: 'BODY', typeName: 'Task' },
            { name: 'filter', value: filter, transport: 'QUERY', typeName: 'string' },
        ]);
    }

    /**
     * Mark task as done
     *
     * HTTP: POST /api/rest/tasks/tasks/{id}/done
     */
    async markAsDone(id: string, metadata: { [key: string]: string }, headers?: any, tags?: Tags[]): Promise<void> {
        await this.$execute<void>('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: string }' },
            { name: 'headers', value: headers, transport: 'HEADER', typeName: 'any' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'Tags[]' },
        ]);
    }

    /**
     * Mark task as done
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /api/rest/tasks/tasks/{id}/done
     */
    markAsDoneRequest(
        id: string,
        metadata: { [key: string]: string },
        headers?: any,
        tags?: Tags[]
    ): RestClientRequest<void> {
        return this.$create<void>('POST', '/tasks/{id}/done', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
            { name: 'metadata', value: metadata, transport: 'BODY', typeName: '{ [key:string]: string }' },
            { name: 'headers', value: headers, transport: 'HEADER', typeName: 'any' },
            { name: 'tags', value: tags, transport: 'QUERY', typeName: 'Tags[]' },
        ]);
    }

    /**
     * Delete task
     *
     * HTTP: DELETE /api/rest/tasks/tasks/{id}
     */
    async removeTask(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/tasks/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete task
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /api/rest/tasks/tasks/{id}
     */
    removeTaskRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/tasks/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
