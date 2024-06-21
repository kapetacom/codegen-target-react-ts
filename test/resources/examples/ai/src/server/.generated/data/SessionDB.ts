//AI-TYPE:dao

//
// GENERATED SOURCE - DO NOT EDIT
//
import Config, { ConfigProvider } from '@kapeta/sdk-config';
import {
    RedisDB as $RedisDB,
    createRedisClient as $createRedisClient,
    RedisClient,
    RedisOptions,
} from '@kapeta/sdk-redis';

export const createSessionClient = (options?: RedisOptions, config?: ConfigProvider): Promise<RedisClient> => {
    return $createRedisClient(config ?? Config.getProvider(), 'session', options);
};

export class SessionDB extends $RedisDB {
    constructor(options?: RedisOptions) {
        super('session', options);
    }
}
