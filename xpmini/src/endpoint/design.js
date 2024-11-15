import { instance } from "./base";

export const designApis = {
    info: (designNo) => {
        return instance.Get('/api/baseapp/design/info', {
            params: {
                designNo
            }
        })
    }
}