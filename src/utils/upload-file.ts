import * as qiniu from 'qiniu-js'
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { UploadFile } from "../servers/db_common"


let returnValue = {
    message: "上传成功！",
    result: null,
    code: 200,
};


const qiniuUploadFile = (options: any) => {
    return new Promise((resolve, reject) => {
        UploadFile().then(response => {
            let uptoken = response.data;
            let domain = "http://qiniuimg.ziyoujike.cn/"
            let key = `${uuidv4()}`;   //这是上船后返回的文件名，这里为了避免重复，加上了时间戳和随机数
            var config = {
                useCdnDomain: true,        //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                region: undefined,      //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。  我这里是华东区
                domain: domain, //配置好的七牛云域名  如   https://cdn.qniyun.com/
                chunkSize: 100,     //每个分片的大小，单位mb，默认值3
                forceDirect: false    //直传还是断点续传方式，true为直传
            };
            var putExtra = {
                fname: options.name,    //文件原始文件名
                params: {},
                mimeType: [] || null
            };
            // @ts-ignore
            var observable = qiniu.upload(options, key, uptoken, putExtra, config);
            observable.subscribe({
                next: (result) => {
                    //主要用来展示进度
                },
                error: (err) => {
                    //上传错误后触发
                    console.log(err);
                    reject(err)
                },
                complete: (result) => {
                    //上传成功后触发。包含文件地址。
                    // @ts-ignore
                    returnValue.result = `${domain}/${result.key}`
                    resolve(returnValue)
                },
            });
        })
    })

}


export {
    qiniuUploadFile,
}