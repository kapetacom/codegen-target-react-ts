//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from '@kapeta/sdk-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { ConfigProvider } from '@kapeta/sdk-config';
import { Entity } from '../../../.generated/entities/Entity';

/**
 * Creates a new ready BackendClient.
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export async function createBackendClient(configProvider: ConfigProvider): Promise<BackendClient> {
    return new BackendClient(false).$withConfigProvider(configProvider);
}

/**
 * A client for the Backend API.
 *
 * Note that this client is not ready to use until it is configured with a ```ConfigProvider```.
 * This happens automatically when using the ```createBackendClient``` function or
 * setting ```autoInit``` to true (the default).
 *
 * If you want to configure the client manually, set autoInit to false and call ```$withConfigProvider```.
 *
 * Recommended method is using ```createBackendClient(configProvider:ConfigProvider)```;
 *
 * See https://github.com/kapetacom/sdk-nodejs-rest-client for more information.
 */
export class BackendClient extends RestClient {
    constructor(autoInit: boolean = true) {
        super('backend', autoInit);
    }

    /**
     *
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /{id}
     */
    async getEntity(id: string): Promise<Entity | null> {
        const result = await this.$execute('GET', '/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);

        if (result === null) {
            return null;
        }
        return result as Entity;
    }

    /**
     *
     *
     * Creates a request that can be manipulated before sending it with the ```call()``` method.
     *
     * HTTP: GET /{id}
     */
    getEntityRequest(id: string): RestClientRequest<Entity | null> {
        return this.$create('GET', '/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
    }
}
