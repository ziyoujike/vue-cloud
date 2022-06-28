
import { message } from "ant-design-vue";
import { API } from "@/libs/db_api";
import axios, { AxiosRequestConfig } from "axios";

type Params = any | Partial<{ isMock: boolean }>;
const rquest = <T>(options: Params): Promise<API.ResponseType<T>> => {
    return new Promise((resolve, reject) => {
        let data: AxiosRequestConfig<any> = {
            method: options.method,
            url: options.url,
        }
        const paramMethods = ['GET', 'DELETE'];
        const dataKey = paramMethods.includes(options.method) ? 'params' : 'data';
        data[dataKey] = options.data;
        axios(data).then(response => {
            if (response.status == 200) {
                if (response.data.code !== 200) {
                    message.error(response.data.message)
                    return reject(response)
                }
                return resolve(response.data)
            } else {
                return reject(response)
            }
        })
    })
}
export default rquest
