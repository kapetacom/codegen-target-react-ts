//
// GENERATED SOURCE - DO NOT EDIT
//
import Config, { ConfigProvider } from '@kapeta/sdk-config';
import { RedisDB as $RedisDB, createRedisClient as $createRedisClient, RedisClient } from '@kapeta/sdk-redis';

export const createSessionClient = (config?: ConfigProvider): Promise<RedisClient> => {
    return $createRedisClient(config ?? Config.getProvider(), 'session');
};

export class SessionDB extends $RedisDB {
    constructor() {
        super('session');
    }
}
