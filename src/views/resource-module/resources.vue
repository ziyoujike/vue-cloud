<template>
    <a-page-header title="c" sub-title="resource module">
        <template #extra>
            <a-button type="primary" @click="showDrawer()">新增资源</a-button>
            <a-button @click="renovateFn">刷新</a-button>
        </template>
    </a-page-header>
    <br />
    <!-- 内容部分 -->
    <Tables :datas='datas' :columns='columns' @EditorFn='EditorFn' @DeleteFn='DeleteFn'/>
    <!-- 新增 -->
    <a-drawer v-model:visible="drawers.visible" class="custom-class" style="color: red" :title="drawers.title"
        placement="right" @after-visible-change="afterVisibleChange" >
        <!-- 新增 -->
        <Classification :isShowResources="true" :selectList="selectList" :formStateList="formStateList" @onSubmitVisible="onSubmitVisible" @closeVisible="closeVisible" />
    </a-drawer>

</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
// 资源模块接口 新增资源 获取资源分类 修改资源 删除资源
import { GetResourcesz,Add_resources,GetresourcesClassify,Update_resources,Delete_resources } from "@/servers/Resource";
import {resource} from '../../libs/Resource.d'
import { message } from "ant-design-vue";
import Classification from "./components/classification.vue";
import Tables from "./components/table.vue";
import {resourceModule} from '@/libs/resource-module'
const drawers = reactive({
    visible: false,
    title: '新增资源'
})
const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
};
// 赋值回显
const formStateList = ref<any>({})
const showDrawer = () => {

    drawers.visible = true;
    formStateList.value = {}
};
//  刷新
const renovateFn =() =>{
 GetResourceszList()
}
let table = reactive({
    current: 1,
    pageSize: 10,
})
// 资源
let GetResourceszList = async () => {
    console.log('GetResourceszList')
    let res = await GetResourcesz(table);
    console.log(res);
    // tableState.columns=res.data.data;
}
GetResourceszList()
const closeVisible =()=>{
    drawers.visible = false;
}
const onSubmitVisible = async(e:any) => {
  if(drawers.title ==='新增资源'){
     const res = await Add_resources(e);
    console.log('res',res)
    if(res.code == 200){
      message.success(res.message)
   
    }else{
      message.error(res.message)
    }
  }else{
    const res = await Update_resources(e)
        if(res.code == 200){
      message.success(res.message)
   
    }else{
      message.error(res.message)
    }
  }

    closeVisible()
}
const selectList:any|resource.typeGetresourcesClassify = ref([])
// 获取资源分类
const selectFn =async()=>{
 const res=  await GetresourcesClassify({
           current: 1,
            pageSize: 100,
    })
    // console.log('resselectFn-----------',res)
    selectList.value = res.data.data
}
selectFn()
const datas:any = ref([])
const datasFn=async()=>{
    const res=  await GetResourcesz({
           current: 1,
            pageSize: 100,
    })
    if(res.code === 200) {

let z:any=res.data.data
         z.map((item:object,i:number)=>{
          z[i].action =''
      })
       datas.value= z 
    }

}

datasFn()
let  columns= ref([
     {
      title: "标题",
      key: "title",
      dataIndex: "title",
    },
        {
      title: "图片",
      dataIndex: "img_url",
      key: "img_url",
    },
    {
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
      {
      title: "链接",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
    }
  ]);
  // 编辑
  const EditorFn =(e:resourceModule.tyoerecord)=>{
     formStateList.value = e
    console.log('-EditorFn',e)
    drawers.visible =true
    drawers.title='编辑资源'
   
  }
  // 删除
  const DeleteFn = async(id:string)=>{
    // 删除
   const res =  await Delete_resources({id})
   console.log(res)
   if(res.code===200){
    message.success(res.message)
   }else {
    message.error(res.message)
   }
  }
</script>