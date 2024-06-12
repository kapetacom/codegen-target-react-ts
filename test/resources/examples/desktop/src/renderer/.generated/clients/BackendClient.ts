//
// GENERATED SOURCE - DO NOT EDIT
//

import { useMemo } from 'react';
import { RestClient } from '@kapeta/sdk-web-rest-client';
import { RestClientRequest } from '@kapeta/sdk-rest';
import { Entity } from '../../../.generated/entities/Entity';

export type ConfigureBackendClient = (client: BackendClient) => BackendClient;

/**
 * Creates a new BackendClient for React components.
 * The client is configured with the provided configuration function.
 *
 * It is wrapped in a useMemo hook to ensure that the client is only created once.
 */
export const useBackendClient = (configure?: ConfigureBackendClient): BackendClient => {
    return useMemo(() => {
        const client = new BackendClient();
        if (configure) {
            return configure(client);
        }
        return client;
    }, [configure]);
};

/**
 * A client for the Backend API.
 * Use the useBackendClient hook to create a client in React.
 *
 * Use the BackendClient directly in other contexts.
 */
export class BackendClient extends RestClient {
    constructor() {
        // @ts-ignore
        if (!window.kapeta.hosts || !window.kapeta.hosts['backend']) {
            throw new Error(`Resource not found: "backend"`);
        }
        // @ts-ignore
        super(window.kapeta.hosts['backend']);
    }

    /**
     * HTTP: GET /{id}
     */
    async getEntity(id: string): Promise<Entity | null> {
        const _result = await this.$execute<Entity>('GET', '/{id}', [
            { name: 'id', value: id, transport: 'PATH', typeName: 'string' },
        ]);

        if (_result === null) {
            return null;
        }
        return _result as Entity;
    }

    /**
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: GET /{id}
     */
    getEntityRequest(id: string): RestClientRequest<Entity | null> {
        return this.$create<Entity>('GET', '/{id}', [{ name: 'id', value: id, transport: 'PATH', typeName: 'string' }]);
    }
}
