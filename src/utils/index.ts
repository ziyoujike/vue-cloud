
import axios from "axios";


const rquest = (options: any) => {

    return new Promise<void>((resolve, reject) => {

        if (options.method == 'GET' || options.method == 'DELETE') {
            axios({
                method: options.method,
                url: options.url,
                params:options.data
            }).then(response => {
                if (response.status == 200) {
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
