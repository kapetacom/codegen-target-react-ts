//
// GENERATED SOURCE - DO NOT EDIT
//
const Path = require("path");
const FS = require("fs");
const Server = require("@kapeta/sdk-server");
const server = new Server("kapeta/portal", Path.resolve(__dirname, "../.."));
const express = require("express");

const TasksClientRoute = require("./api/TasksClientRoute");

const devMode =
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase() === "development";

if (devMode) {
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

server.addRoute(new TasksClientRoute());

server.start("web");
