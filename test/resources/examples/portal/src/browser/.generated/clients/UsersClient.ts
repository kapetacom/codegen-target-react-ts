//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient, RestClientRequest } from '@kapeta/sdk-web-rest-client';

export type ConfigureUsersClient = (client: UsersClient) => UsersClient;

/**
 * Creates a new UsersClient for React components.
 * The client is configured with the provided configuration function.
 *
 * It is wrapped in a useMemo hook to ensure that the client is only created once.
 */
export const useUsersClient = (configure?: ConfigureUsersClient): UsersClient => {
    return useMemo(() => {
        const client = new UsersClient();
        if (configure) {
            return configure(client);
        }
        return client;
    }, [configure]);
};

/**
 * A client for the Users API.
 * Use the useUsersClient hook to create a client in React.
 *
 * Use the UsersClient directly in other contexts.
 */
export class UsersClient extends RestClient {
    constructor() {
        super('api/rest/users');
    }

    /**
     * Add user
     *
     * HTTP: POST /api/rest/users/users/{userId}
     */
    async addUser(userId: string): Promise<void> {
        await this.$execute<void>('POST', '/users/{userId}', [
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Add user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /api/rest/users/users/{userId}
     */
    addUserRequest(userId: string): RestClientRequest<void> {
        return this.$create<void>('POST', '/users/{userId}', [
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user
     *
     * HTTP: DELETE /api/rest/users/users/{id}
     */
    async removeUser(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /api/rest/users/users/{id}
     */
    removeUserRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
