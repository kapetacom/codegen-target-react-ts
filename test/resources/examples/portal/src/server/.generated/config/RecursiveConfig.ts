import Config from '@kapeta/sdk-config';

export interface RecursiveConfig {
    children: RecursiveConfig[];
}

export const getRecursiveConfig = (defaultValue: RecursiveConfig): RecursiveConfig => {
    return Config.getOrDefault<RecursiveConfig>('Recursive', defaultValue);
};
