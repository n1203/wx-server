import Taro from '@tarojs/taro';
import { createAlova } from 'alova';
import AdapterTaro from '@alova/adapter-taro';

export const noImmediate = {
    immediate: false,
};

export const instance = createAlova({
    baseURL: 'http://localhost:8001',
    ...AdapterTaro(),
    headers: {
        'Access-Control-Allow-Origin': '*',
        'userNo': localStorage.getItem('userNo'),
    },
    timeout: 30000,
    beforeRequest: (method) => {
        method.config.headers.userNo = localStorage.getItem('userNo')
    },
    responded: {
        onSuccess: async (response, method) => {
            try {
                if (response.status >= 400) {
                    throw new Error(response.statusText);
                }
                const json = await response?.data;
                if (json.code !== 200) {
                    // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
                    throw new Error(json.msg);
                }

                // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
                return json.data;
            } catch (error) {
                // throw error;
            }
        },
    },
});
