//
// GENERATED SOURCE - DO NOT EDIT
//
import Path from "path";
import FS from "fs";
import { Server } from "@kapeta/sdk-server";
const server = new Server("kapeta/portal", Path.resolve(__dirname, "../.."));
import express from "express";
import history from "connect-history-api-fallback";
import { TasksClientRoute } from "./api/TasksClientRoute";
import { SubpageProxyRoute } from "./proxies/fragments/SubpageProxyRoute";

const devMode =
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase() === "development";

server.addRoute(new SubpageProxyRoute());
server.addRoute(new TasksClientRoute());

server.express().use(history());
if (devMode) {
    /* eslint-disable */
    console.log("Serving development version");
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const config = require("../../webpack.development.config");
    const compiler = webpack(config);

    server.express().use(
        "/",
        webpackDevMiddleware(compiler, {
            publicPath: "/",
        })
    );

    server.express().use(require("webpack-hot-middleware")(compiler));
    /* eslint-enable */
} else {
    console.log("Serving production version");

    const BASE_DIR = Path.resolve(__dirname, "../../dist");
    if (!FS.existsSync(BASE_DIR)) {
        console.error(
            "Distribution folder (%s) is missing - did you remember to build before running?",
            BASE_DIR
        );
        process.exit(1);
    }

    server.express().use(express.static(BASE_DIR));
}
server.start("web");
