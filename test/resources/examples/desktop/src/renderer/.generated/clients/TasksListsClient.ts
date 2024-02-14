//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient } from '@kapeta/sdk-web-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';

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
        // @ts-ignore
        if (!window.kapeta.hosts || !window.kapeta.hosts['tasks']) {
            throw new Error(`Resource not found: "tasks"`);
        }
        // @ts-ignore
        super(window.kapeta.hosts['tasks']);
    }

    /**
     * Add list
     *
     * HTTP: POST /lists/{id}
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
     * HTTP: POST /lists/{id}
     */
    addListRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('POST', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete list
     *
     * HTTP: DELETE /lists/{id}
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
     * HTTP: DELETE /lists/{id}
     */
    removeListRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
