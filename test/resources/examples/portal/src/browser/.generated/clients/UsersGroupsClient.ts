//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient } from '@kapeta/sdk-web-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { Pageable } from '@kapeta/sdk-rest';

export type ConfigureUsersGroupsClient = (client: UsersGroupsClient) => UsersGroupsClient;

/**
 * Creates a new UsersGroupsClient for React components.
 * The client is configured with the provided configuration function.
 *
 * It is wrapped in a useMemo hook to ensure that the client is only created once.
 */
export const useUsersGroupsClient = (configure?: ConfigureUsersGroupsClient): UsersGroupsClient => {
    return useMemo(() => {
        const client = new UsersGroupsClient();
        if (configure) {
            return configure(client);
        }
        return client;
    }, [configure]);
};

/**
 * A client for the UsersGroups API.
 * Use the useUsersGroupsClient hook to create a client in React.
 *
 * Use the UsersGroupsClient directly in other contexts.
 */
export class UsersGroupsClient extends RestClient {
    constructor() {
        super('api/rest/users');
    }

    /**
     * Get all
     *
     * HTTP: GET /api/rest/users/groups/
     */
    async getAll(pageable: Pageable): Promise<string[] | null> {
        const _result = await this.$execute<string[]>('GET', '/groups/', [
            { name: 'pageable', value: pageable, transport: 'QUERY', typeName: 'Pageable' },
        ]);

        if (_result === null) {
            return null;
        }
        return _result as string[];
    }

    /**
     * Get all
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /api/rest/users/groups/
     */
    getAllRequest(pageable: Pageable): RestClientRequest<string[] | null> {
        return this.$create<string[]>('GET', '/groups/', [
            { name: 'pageable', value: pageable, transport: 'QUERY', typeName: 'Pageable' },
        ]);
    }

    /**
     * Add user group
     *
     * HTTP: POST /api/rest/users/groups/{id}
     */
    async addGroup(id: string): Promise<void> {
        await this.$execute<void>('POST', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Add user group
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /api/rest/users/groups/{id}
     */
    addGroupRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('POST', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user group
     *
     * HTTP: DELETE /api/rest/users/groups/{id}
     */
    async removeGroup(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user group
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /api/rest/users/groups/{id}
     */
    removeGroupRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
