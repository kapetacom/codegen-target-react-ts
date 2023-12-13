import { ConfigProvider } from "@kapeta/sdk-config";
import { Server } from "@kapeta/sdk-server";

export const createServer = async (config: ConfigProvider): Promise<Server> => {
    return new Server(config);
};
