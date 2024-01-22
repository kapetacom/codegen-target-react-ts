//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient, RestClientRequest } from '@kapeta/sdk-web-rest-client';

export type ConfigureTasksListsClient = (client: TasksListsClient) => TasksListsClient;

/**
 * Creates a new TasksListsClient for React components.
 * The client is configured with the provided configuration function.
 *
 * It is wrapped in a useMemo hook to ensure that the client is only created once.
 */
export const useTasksListsClient = (configure?: ConfigureTasksListsClient): TasksListsClient => {
    return useMemo(() => {
        const client = new TasksListsClient();
        if (configure) {
            return configure(client);
        }
        return client;
    }, [configure]);
};

/**
 * A client for the TasksLists API.
 * Use the useTasksListsClient hook to create a client in React.
 *
 * Use the TasksListsClient directly in other contexts.
 */
export class TasksListsClient extends RestClient {
    constructor() {
        super('api/rest/tasks');
    }

    /**
     * Add list
     *
     * HTTP: POST /api/rest/tasks/lists/{id}
     */
    async addList(id: string): Promise<void> {
        await this.$execute<void>('POST', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Add list
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /api/rest/tasks/lists/{id}
     */
    addListRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('POST', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete list
     *
     * HTTP: DELETE /api/rest/tasks/lists/{id}
     */
    async removeList(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete list
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /api/rest/tasks/lists/{id}
     */
    removeListRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
