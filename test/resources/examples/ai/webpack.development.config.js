const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const PAGES = require('./webpack.pages.js');

const HotMiddlewareScript = 'webpack-hot-middleware/client?path=__webpack_hmr&timeout=20000&reload=true';

const devMode = process.env.NODE_ENV === 'development';

const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

const makeEntry = (name, localPath) => {
    const path = './' + Path.join('./src/browser/pages/', localPath);

    if (!devMode) {
        return [path];
    }

    return [HotMiddlewareScript + '&name=' + encodeURIComponent(name), path];
};

const entries = {};

PAGES.forEach((page) => {
    while (page.path.startsWith('/')) {
        page.path = page.path.substring(1);
    }

    if (page.path) {
        const chunk = page.path + '/main';
        entries[chunk] = makeEntry(chunk, page.localPath);
    } else {
        const chunk = 'main';
        entries[chunk] = makeEntry(chunk, page.localPath);
    }
});

const config = {
    mode: devMode ? 'development' : 'production',
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
        publicPath: 'dist/',
    },
    entry: entries,
    devtool: devMode ? 'inline-source-map' : false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/typescript', '@babel/react'],
                    plugins: [
                        ...(devMode ? ['react-refresh/babel'] : []),
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ],
                },
            },
            {
                test: /\.css$/,
                use: [styleLoader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [styleLoader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [styleLoader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ya?ml$/,
                use: ['json-loader', 'yaml-loader'],
            },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.sass', '.scss', '.yml', '.yaml'],
        alias: {
            react: Path.resolve(__dirname, './node_modules/react'),
            'react-dom': Path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
    plugins: [],
};

if (devMode) {
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin());
} else {
    config.plugins.unshift(
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        })
    );

    config.plugins.unshift(new CleanWebpackPlugin());
    config.plugins.push(
        new AssetsPlugin({
            filename: 'assets.json',
            useCompilerPath: true,
        })
    );
}

module.exports = config;
