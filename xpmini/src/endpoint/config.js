import { instance } from "./base";

export const configApi = {
    getConfig: () => {
        return instance.Get("/api/baseapp/config/protocol");
    },
};
