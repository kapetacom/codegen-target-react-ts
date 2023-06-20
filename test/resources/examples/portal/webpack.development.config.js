//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const HotMiddlewareScript =
    "webpack-hot-middleware/client?path=__webpack_hmr&timeout=20000&dynamicPublicPath=true&reload=true";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const PAGES = [];

PAGES.push({
    name: "MyPage",
    path: "/",
    localPath: "my_page",
});

const devMode = process.env.NODE_ENV === "development";

const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

const makeEntry = (name, localPath) => {
    const path = "./" + Path.join("./src/browser/pages/", localPath);

    if (!devMode) {
        return [path];
    }

    return [HotMiddlewareScript + "&name=" + encodeURIComponent(name), path];
};

const entries = {};
const htmlPlugins = [];

PAGES.forEach((page) => {
    while (page.path.startsWith("/")) {
        page.path = page.path.substring(1);
    }

    if (page.path) {
        const chunk = page.path + "/main";
        entries[chunk] = makeEntry(chunk, page.localPath);
    } else {
        const chunk = "main";
        entries[chunk] = makeEntry(chunk, page.localPath);
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
        publicPath: "",
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
        mainFields: ["main"],
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
        alias: {
            react: Path.resolve(__dirname, "./node_modules/react"),
            "react-dom": Path.resolve(__dirname, "./node_modules/react-dom"),
        },
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
    config.plugins.push(
        new AssetsPlugin({
            filename: "assets.json",
            useCompilerPath: true,
        })
    );
}

module.exports = config;
