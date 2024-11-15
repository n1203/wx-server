import { instance } from "./base";

const USER_APIS = {
    register: '/api/xpuser/register',
}

export const userApis = {
    register: (data) => instance.Post(USER_APIS.register, data),
}