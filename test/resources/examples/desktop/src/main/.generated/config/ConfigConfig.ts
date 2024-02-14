import Config from '@kapeta/sdk-config';

export interface ConfigConfig {
    name?: string;
}

export const getConfigConfig = (defaultValue: ConfigConfig): ConfigConfig => {
    return Config.getOrDefault<ConfigConfig>('Config', defaultValue);
};
