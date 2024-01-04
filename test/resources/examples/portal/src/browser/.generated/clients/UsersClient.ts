//
// GENERATED SOURCE - DO NOT EDIT
//

import { RestClient, RestClientRequest } from '@kapeta/sdk-web-rest-client';

export class UsersClient extends RestClient {
    constructor() {
        super('api/rest/users');
    }

    /**
     * Add user
     * HTTP: POST /api/rest/users/users/{userId}
     */
    async addUser(userId: string): Promise<void> {
        await this.$execute<void>('POST', '/users/{userId}', [{ name: 'userId', value: userId, transport: 'path' }]);
    }

    /**
     * Add user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /users/{userId}
     */
    addUserRequest(userId: string): RestClientRequest<void> {
        return this.$create<void>('POST', '/users/{userId}', [{ name: 'userId', value: userId, transport: 'path' }]);
    }

    /**
     * Delete user
     * HTTP: DELETE /api/rest/users/users/{id}
     */
    async removeUser(id: string): Promise<void> {
        await this.$execute<void>('DELETE', '/users/{id}', [{ name: 'id', value: id, transport: 'path' }]);
    }

    /**
     * Delete user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /users/{id}
     */
    removeUserRequest(id: string): RestClientRequest<void> {
        return this.$create<void>('DELETE', '/users/{id}', [{ name: 'id', value: id, transport: 'path' }]);
    }
}
