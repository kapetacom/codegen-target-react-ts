//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const HotMiddlewareScript =
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const PAGES = [];

PAGES.push({
    name: "MyPage",
    path: "/",
    localPath: "my_page",
});

const devMode = process.env.NODE_ENV === "development";

const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

const makeEntry = (localPath) => {
    const path = "./" + Path.join("./src/browser/pages/", localPath);

    if (!devMode) {
        return [path];
    }

    return [HotMiddlewareScript, path];
};

const entries = {};
const htmlPlugins = [];

PAGES.forEach((page) => {
    while (page.path.startsWith("/")) {
        page.path = page.path.substr(1);
    }

    if (page.path) {
        const chunk = page.path + "/main";
        entries[chunk] = makeEntry(page.localPath);
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                title: page.name,
                filename: page.path + "/index.html",
                chunks: [chunk],
            })
        );
    } else {
        const chunk = "main";
        entries[chunk] = makeEntry(page.localPath);
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                title: page.name,
                filename: "index.html",
                chunks: [chunk],
            })
        );
    }
});

const config = {
    mode: devMode ? "development" : "production",
    optimization: devMode
        ? {}
        : {
              minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
          },
    output: {
        path: Path.join(__dirname, "dist"),
        filename: "[name].[hash].bundle.js",
        publicPath: "/",
    },
    entry: entries,
    devtool: devMode ? "inline-source-map" : false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/env",
                        "@babel/typescript",
                        "@babel/react",
                    ],
                    plugins: [
                        ...(devMode ? ["react-refresh/babel"] : []),
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        [
                            "@babel/plugin-proposal-private-methods",
                            { loose: true },
                        ],
                        [
                            "@babel/plugin-proposal-private-property-in-object",
                            { loose: true },
                        ],
                        [
                            "@babel/plugin-proposal-class-properties",
                            { loose: true },
                        ],
                        "@babel/proposal-object-rest-spread",
                    ],
                },
            },
            {
                test: /\.less$/,
                use: [styleLoader, "css-loader", "less-loader"],
                include: Path.resolve(__dirname, "./"),
            },
            {
                test: /\.s[ac]ss$/i,
                use: [styleLoader, "css-loader", "sass-loader"],
                include: Path.resolve(__dirname, "./"),
            },
            {
                test: /\.ya?ml$/,
                use: ["json-loader", "yaml-loader"],
                include: Path.resolve(__dirname, "./"),
            },
        ],
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".less",
            ".sass",
            ".scss",
            ".yml",
            ".yaml",
        ],
    },
    plugins: htmlPlugins,
    externals: {},
};

if (devMode) {
    config.plugins.unshift(
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    );
} else {
    config.plugins.unshift(
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        })
    );

    config.plugins.unshift(new CleanWebpackPlugin());
}

module.exports = config;
