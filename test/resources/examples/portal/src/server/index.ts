import Path from "path";
import FS from "fs";
import { Server } from "@kapeta/sdk-server";
const server = new Server("kapeta/portal", Path.resolve(__dirname, "../.."));
import express from "express";
import history from "connect-history-api-fallback";
import { TasksProxyRoute } from "./proxies/rest/TasksProxyRoute";
import { SubpageProxyRoute } from "./proxies/fragments/SubpageProxyRoute";

const devMode =
    process.env.NODE_ENV &&
    process.env.NODE_ENV.toLowerCase() === "development";

server.addRoute(new SubpageProxyRoute());
server.addRoute(new TasksProxyRoute());

const BASE_DIR = Path.resolve(__dirname, "../../dist");
const webpackConfig = require("../../webpack.development.config");
server.configureAssets(BASE_DIR, webpackConfig);

server.start("web");
