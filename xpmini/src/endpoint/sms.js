import { instance } from "./base";

export const smsApis = {
    sendCode: (data) => instance.Post('/api/sms/code', data),
}