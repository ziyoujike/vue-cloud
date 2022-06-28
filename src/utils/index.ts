
import { message } from "ant-design-vue";
import { API } from "@/libs/db_api";
import axios from "axios";

type Params = any | Partial<{ isMock: boolean }>;
const rquest = <T>(options: Params): Promise<API.ResponseType<T>> => {

    return new Promise((resolve, reject) => {

        if (options.method == 'GET' || options.method == 'DELETE') {
            axios({
                method: options.method,
                url: options.url,
                params:options.data
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code !== 200) {
                        message.error(response.data.message)
                        return reject(response)
                    }
                    return resolve(response.data)
                }
                else {
                    return reject(response)
                }
            })
        }
        if (options.method == 'POST' || options.method == 'PUT') {
            axios({
                method: options.method,
                url: options.url,
                data: options.data
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.code !== 200) {
                        message.error(response.data.message)
                        return reject(response)
                    }
                    return resolve(response.data)
                }
                else {
                    return reject(response)
                }
            })
        }
    })
}
export default rquest
