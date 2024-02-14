/* eslint-disable import/no-relative-packages */
/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import Path from "path";

const configuration: webpack.Configuration = {
    externals: ['@kapeta/sdk-config'],

    stats: 'errors-only',

    parallelism: 20,

    output: {
        path: webpackPaths.srcPath,
        // https://github.com/webpack/webpack/issues/1114
        library: {
            type: 'commonjs2',
        },
    },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
            '.css',
            '.less',
            '.yml',
            '.yaml',
        ],
        alias: {
            'react': Path.resolve(webpackPaths.rootPath, './node_modules/react'),
            'react-dom': Path.resolve(webpackPaths.rootPath, './node_modules/react-dom'),
            'react-router-dom': Path.resolve(webpackPaths.rootPath, './node_modules/react-router-dom'),
        },
        modules: [webpackPaths.srcPath, 'node_modules'],
        // There is no need to add aliases here, the paths in tsconfig get mirrored
        plugins: [new TsconfigPathsPlugins()],
        fallback: {
            path: require.resolve('path-browserify')
        },
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
    ],
};

export default configuration;
