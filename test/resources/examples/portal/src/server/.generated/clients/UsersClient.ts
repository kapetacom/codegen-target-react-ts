//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient, RestClientRequest } from '@kapeta/sdk-rest-client';

export class UsersClient extends RestClient {
    constructor() {
        super('users');
    }

    /**
     * Add user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /users/{userId}
     */
    async addUser(userId: string): Promise<void> {
        await this.$execute('POST', '/users/{userId}', [{ name: 'userId', value: userId, transport: 'path' }]);
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
        return this.$create('POST', '/users/{userId}', [{ name: 'userId', value: userId, transport: 'path' }]);
    }

    /**
     * Delete user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /users/{id}
     */
    async removeUser(id: string): Promise<void> {
        await this.$execute('DELETE', '/users/{id}', [{ name: 'id', value: id, transport: 'path' }]);
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
        return this.$create('DELETE', '/users/{id}', [{ name: 'id', value: id, transport: 'path' }]);
    }
}
