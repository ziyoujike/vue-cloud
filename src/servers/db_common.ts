import rquest from "../utils";

// 获取字典列表
export const GetDictionariesList = () => {

    return rquest({
        method: "GET",
        url: "/api/common/getDictionariesList",
    })
}
// 新增字典
export const AddDictionaries = (options: any) => {
    return rquest({
        method: "POST",
        url: "/api/common/addDictionariesItem",
        data: options
    })
}
// 删除字典
export const DelDictionaries = (options: any) => {

    return rquest({
        method: "DELETE",
        url: "/api/common/delDictionariesItem",
        data: options
    })
}
// 修改字典
export const PutDictionariesItem = (options: any) => {
    return rquest({
        method: "PUT",
        url: "/api/common/putDictionariesItem",
        data: options
    })
}
// 上传文件

export const UploadFile = () => {
    return rquest({
        method: "GET",
        url: "/api/common/uploadFile",
    })
}


