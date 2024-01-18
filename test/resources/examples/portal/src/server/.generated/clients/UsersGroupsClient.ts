//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient, RestClientRequest } from '@kapeta/sdk-rest-client';
import { ConfigProvider } from '@kapeta/sdk-config';

/**
 * Creates a new ready UsersGroupsClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createUsersGroupsClient(configProvider: ConfigProvider): Promise<UsersGroupsClient> {
    return new UsersGroupsClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the UsersGroups API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createUsersGroupsClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createUsersGroupsClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class UsersGroupsClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('users', autoInit);
    }

    /**
     * Add user group
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /groups/{id}
     */
    async addGroup(id: string): Promise<void> {
        await this.$execute('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }

    /**
     * Add user group
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /groups/{id}
     */
    addGroupRequest(id: string): RestClientRequest<void> {
        return this.$create('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }

    /**
     * Delete user group
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /groups/{id}
     */
    async removeGroup(id: string): Promise<void> {
        await this.$execute('DELETE', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }

    /**
     * Delete user group
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /groups/{id}
     */
    removeGroupRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH' }]);
    }
}
