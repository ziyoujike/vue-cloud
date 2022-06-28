
// /resources/get_resources
import rquest from "../utils";
import {resource} from '@/libs/Resource'
// 资源模块
export const GetResourcesz =(options:any)=>{
    return rquest<resource.typeGetResourcesz>({
        method:'GET',
        url:'/api/resources/get_resources',
        data:options
    })
}
// 获取资源分类
export const GetresourcesClassify =(options:any)=>{
    return rquest<resource.typeGetresourcesClassify>({
        method:'GET',
        url:'/api/resources/get_resources_classify',
        data:options
    })
}

// ​
// 新增资源
export const Add_resources =(options:any)=>{
    return rquest({
        method:'POST',
        url:'/api/resources/add_resources',
        data:options
    })
}

// 新增资源分类
export const Addresources_classify =(options:any)=>{
    return rquest({
        method:'POST',
        url:'/api/resources/add_resources_classify',
        data:options
    })
}