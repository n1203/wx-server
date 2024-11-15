import { instance } from "./base";

const ORDER_API_PREFIX = '/api/baseapp/order';

export const orderApi = {
    info: () => instance.Get(`/api/baseapp/school/info`, {}),
    getOrderList: (params) => instance.Get(`${ORDER_API_PREFIX}/list`, { params }),
    getSchoolOrderList: (params) => instance.Get(`${ORDER_API_PREFIX}/school/list`, { params }),
}
