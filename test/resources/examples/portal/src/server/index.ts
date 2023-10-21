import Path from "path";
import { Server } from "@kapeta/sdk-server";
const server = new Server("kapeta/portal", Path.resolve(__dirname, "../.."));
import { TasksProxyRoute } from "./proxies/rest/TasksProxyRoute";
import { SubpageProxyRoute } from "./proxies/fragments/SubpageProxyRoute";

server.addRoute(new SubpageProxyRoute());
server.addRoute(new TasksProxyRoute());

const BASE_DIR = Path.resolve(__dirname, "../../dist");
const webpackConfig = require("../../webpack.development.config");
server.configureAssets(BASE_DIR, webpackConfig);

server.start("web");
