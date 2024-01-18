//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient, RestClientRequest } from '@kapeta/sdk-web-rest-client';

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
     * Add user group
     *
     * HTTP: POST /api/rest/users/groups/{id}
     */
    async addGroup(id: string): Promise<void> {
        await this.$execute<void>('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
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
        return this.$create<void>('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }

    /**
     * Delete user group
     *
     * HTTP: DELETE /api/rest/users/groups/{id}
     */
    async removeGroup(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
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
        return this.$create<void>('DELETE', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }
}
