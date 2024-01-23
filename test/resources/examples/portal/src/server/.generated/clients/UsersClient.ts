//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { ConfigProvider } from '@kapeta/sdk-config';

/**
 * Creates a new ready UsersClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createUsersClient(configProvider: ConfigProvider): Promise<UsersClient> {
    return new UsersClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the Users API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createUsersClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createUsersClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class UsersClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('users', autoInit);
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
        await this.$execute('POST', '/users/{userId}', [
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Add user
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /users/{userId}
     */
    addUserRequest(userId: string): RestClientRequest<void> {
        return this.$create('POST', '/users/{userId}', [
            { name: 'userId', value: userId, transport: 'PATH', typeName: 'string' },
        ]);
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
        await this.$execute('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /users/{id}
     */
    removeUserRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/users/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
