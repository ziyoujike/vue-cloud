
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
// ​
// 新增资源
export const Add_resources =(options:any)=>{
    return rquest({
        method:'POST',
        url:'/api/resources/add_resources',
        data:options
    })
}
// 修改资源
export const Update_resources =(options:any)=>{
    return rquest({
        method:'PUT',
        url:'/api/resources/update_resources',
        data:options
    })
}

// ​
// 删除资源
export const Delete_resources =(options:any)=>{
    return rquest({
        method:'DELETE',
        url:'/api/resources/delete_resources',
        data:options
    })
}
/*******************
 * 分类
 */

// 新增资源分类
export const Addresources_classify =(options:any)=>{
    return rquest({
        method:'POST',
        url:'/api/resources/add_resources_classify',
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
// 修改资源分类
export const Update_resources_classify =(options:any)=>{
    return rquest<resource.typeGetresourcesClassify>({
        method:'PUT',
        url:'/api/resources/update_resources_classify',
        data:options
    })
}

// 删除资源分类
export const Delete_resources_classify =(options:any)=>{
    return rquest<resource.typeGetresourcesClassify>({
        method:'DELETE',
        url:'/api/resources/delete_resources_classify',
        data:options
    })
}
