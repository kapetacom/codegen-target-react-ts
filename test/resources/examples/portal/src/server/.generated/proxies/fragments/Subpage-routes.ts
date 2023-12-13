//
// GENERATED SOURCE - DO NOT EDIT
//
import { Router } from "express";
import { createProxyRoute } from "@kapeta/sdk-proxy-route";
import { ConfigProvider } from "@kapeta/sdk-config";

export const createSubpageRouter = async (provider: ConfigProvider) => {
    const router = Router();
    router.use(
        "/fragments/subpage",
        await createProxyRoute(provider, "subpage", "web")
    );

    return router;
};
