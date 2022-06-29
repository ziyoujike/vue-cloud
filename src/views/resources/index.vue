<template>
  <a-page-header title="资源管理" sub-title="Resources">
    <template #extra>
      <a-button @click="showResourcesModel" type="primary">新增</a-button>
      <a-button @click="handleRefresh"><sync-outlined />刷新</a-button>
    </template>
  </a-page-header>
  <br />
  <a-form layout="inline">
    <a-form-item>
      <a-select
        v-model:value="pagination.resources_type"
        aria-placeholder="选择资源类型搜索"
        style="width: 200px"
        placeholder="请选择资源类型"
        allowClear
      >
        <a-select-option v-for="item in ResourcesType" :value="item.code">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleRefresh"> 搜索</a-button>
    </a-form-item>
  </a-form>
  <br />
  <a-table
    :dataSource="tableState.dataSource"
    :columns="tableState.columns"
    bordered
    :pagination="pagination"
    @change="handleChange"
  >
    <template #icon_url="{ record }">
      <img :src="record.icon_url" alt="" style="width: 60px; height: 40px" />
    </template>
    <template #resources_type="{ record }">
      {{ formatDictionaries("Resources_Type", record.resources_type) }}
    </template>
    <template #link="{ record }">
      <a :href="record.link" target="_blank" rel="noopener noreferrer">{{
        record.link
      }}</a>
    </template>
    <template #action="{ record }">
      <a-button
        type="primary"
        size="small"
        @click="editDictionariesItem(record)"
        >编辑</a-button
      >
      <a-divider type="vertical" />
      <a-button
        type="primary"
        size="small"
        danger
        @click="delDictionaryItem(record)"
        >删除</a-button
      >
    </template>
  </a-table>
  <ResourcesModel ref="ResourcesModelRefs" @emitGetData="getData" />
</template>
<script setup lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { GetResourcesListAll, DelResourcesItem } from "../../servers/db_docs";
import { SyncOutlined } from "@ant-design/icons-vue";
import ResourcesModel from "./components/resources-model.vue";
import { formatDictionaries, dictionaries } from "@/utils/main";
import { message } from "ant-design-vue";
const ResourcesType = dictionaries("Resources_Type");
let tableState = reactive({
  columns: [
    {
      title: "资源图标",
      dataIndex: "icon_url",
      key: "icon_url",
      slots: { customRender: "icon_url" },
      align: "center",
    },
    {
      title: "资源标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "资源类型",
      dataIndex: "resources_type",
      key: "resources_type",
      slots: { customRender: "resources_type" },
    },
    {
      title: "资源链接",
      dataIndex: "link",
      key: "link",
      slots: { customRender: "link" },
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "备注信息",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      align: "center",
      slots: { customRender: "action" },
    },
  ],
  dataSource: [],
});
let pagination = reactive({
  current: 1,
  pageSize: 10,
  resources_type: null,
  total: 0,
  showTotal: (total:string) => {
    return `共 ${total} 条数据 `;
  },
});
const getData = () => {
  GetResourcesListAll(pagination).then((response: any) => {
    tableState.dataSource = response.data;
    pagination.total = response.total;
    console.log(tableState.dataSource);
  });
};
getData(); 

const handleChange = (options:any) => {
  console.log(options);
  pagination.current = options.current;
  getData();
};
const handleRefresh = () => {
  pagination.current = 1;
  getData();
};
const Model = {
  isEdit: false,
  data: null,
};

let ResourcesModelRefs = ref<any>(null);

let showResourcesModel = () => {
  console.log(ResourcesModelRefs);
  Model.isEdit = false;
  Model.data = null;
  ResourcesModelRefs.value.showDrawer(Model);
};

const delDictionaryItem = (item:any) => {
  console.log(item);
  DelResourcesItem({ id: item.id }).then((response: any) => {
    console.log(response);
    if (response.code == 200) {
      message.success("删除成功");
      getData();
    } else {
      message.error("删除失败");
    }
  });
};
const editDictionariesItem = (item:any) => {
  Model.isEdit = true;
  Model.data = item;
  ResourcesModelRefs.value.showDrawer(Model);
};
</script>
