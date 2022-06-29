<template>
    <a-page-header title="c" sub-title="resource module">
        <template #extra>
            <a-button type="primary" @click="showDrawer(false)">新增资源分类</a-button>
            <a-button>刷新</a-button>
        </template>
    </a-page-header>
    <br />
        <!-- 内容部分 -->
    <Tables :datas='datas' :columns='columns'/>
    <!-- 新增 -->
    <a-drawer v-model:visible="drawers.visible" class="custom-class" style="color: red" :title="drawers.title"
        placement="right" @after-visible-change="afterVisibleChange" >
        <!-- 新增 -->
        <Classification :isShowResources="false" @onSubmitVisible="onSubmitVisible" @closeVisible="closeVisible" />
    </a-drawer>

</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
// 获取资源分类 新增资源分类
import { GetresourcesClassify,Addresources_classify } from "@/servers/Resource";
import { message } from "ant-design-vue";
import Classification from "./components/classification.vue";
import Tables from "./components/table.vue";
const drawers = reactive({
    visible: false,
    title: '新增资源分类'
})
const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
};

const showDrawer = (e: boolean) => {

    drawers.visible = true;
};
let tableState = reactive({
    columns: []
})
let table = reactive({
    current: 1,
    pageSize: 10,
})
// 资源
let GetresourcesClassifylist = async () => {
    console.log('GetresourcesClassifylist')
    let res = await GetresourcesClassify(table);
    console.log(res);
    // tableState.columns=res.data.data;
}

GetresourcesClassifylist()
const closeVisible =()=>{
    drawers.visible = false;
}
const onSubmitVisible = async(e:any) => {
    console.log('资源分类onSubmitVisible',e)
    let z ={
        desc:e.desc,
        img_url:e.img_url,
        title:e.title,
    }
 const res = await Addresources_classify(z);
    console.log('res',res)
    if(res.code == 200){
      message.success(res.message)
   
    }else{
      message.error(res.message)
    }
    closeVisible()
}
const datas:any = ref([])
const datasFn=async()=>{
    const res=  await GetresourcesClassify ({
           current: 1,
            pageSize: 100,
    })
    if(res.code === 200) {
    datas.value=res.data.data
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
  ]);

</script>