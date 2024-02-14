//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { ConfigProvider } from '@kapeta/sdk-config';

/**
 * Creates a new ready TasksListsClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createTasksListsClient(configProvider: ConfigProvider): Promise<TasksListsClient> {
    return new TasksListsClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the TasksLists API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createTasksListsClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createTasksListsClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class TasksListsClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('tasks', autoInit);
    }

    /**
     * Add list
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: POST /lists/{id}
     */
    async addList(id: string): Promise<void> {
        await this.$execute('POST', '/lists/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
    }

    /**
     * Add list
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: POST /lists/{id}
     */
    addListRequest(id: string): RestClientRequest<void> {
        return this.$create('POST', '/lists/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
    }

    /**
     * Delete list
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /lists/{id}
     */
    async removeList(id: string): Promise<void> {
        await this.$execute('DELETE', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }

    /**
     * Delete list
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: DELETE /lists/{id}
     */
    removeListRequest(id: string): RestClientRequest<void> {
        return this.$create('DELETE', '/lists/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);
    }
}
