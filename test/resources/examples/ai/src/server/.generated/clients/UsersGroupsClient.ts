//AI-TYPE:server-api-client

//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { ConfigProvider } from '@kapeta/sdk-config';
import { Pageable } from '@kapeta/sdk-rest';

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
     * Get all
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /groups/
     */
    async getAll(pageable: Pageable): Promise<string[] | null> {
        const _result = await this.$execute('GET', '/groups/', [
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
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /groups/
     */
    getAllRequest(pageable: Pageable): RestClientRequest<string[] | null> {
        return this.$create('GET', '/groups/', [
            { name: 'pageable', value: pageable, transport: 'QUERY', typeName: 'Pageable' },
        ]);
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
        await this.$execute('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
    }

    /**
     * Add user group
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /groups/{id}
     */
    addGroupRequest(id: string): RestClientRequest<void> {
        return this.$create('POST', '/groups/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
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
        await this.$execute('DELETE', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete user group
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /groups/{id}
     */
    removeGroupRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/groups/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
