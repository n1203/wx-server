import { createAlova } from 'alova';
import AdapterTaro from '@alova/adapter-taro';

export const instance = createAlova({
    baseURL: 'https://api.alovajs.org',
    ...AdapterTaro()
});