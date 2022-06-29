import rquest from "../utils";


export const GetResourcesListAll = (options:any) => {

    return rquest({
        method: "GET",
        url: "/api/resources/getResourcesListAll",
        data: options
    })
}
export const AddResourcesItem = (options: any) => {
    return rquest({
        method: "POST",
        url: "/api/resources/addResourcesItem",
        data: options
    })
}

export const DelResourcesItem = (options: any) => {

    return rquest({
        method: "DELETE",
        url: "/api/resources/delResourcesItem",
        data: options
    })
}
export const PutResourcesItem = (options: any) => {
    return rquest({
        method: "PUT",
        url: "/api/resources/putResourcesItem",
        data: options
    })
}

