<template>
  <a-page-header title="字典" sub-title="Dictionary Management">
    <template #extra>
      <a-button @click="showDictionaryModel" type="primary">新增</a-button>
      <a-button @click="getData"><sync-outlined />刷新</a-button>
    </template>
  </a-page-header>
  <br />
  <a-table
    :dataSource="tableState.dataSource"
    :columns="tableState.columns"
    bordered
  >
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
  <DictionaryModel ref="DictionaryModelRefs" @emitGetData="getData" />
</template>
<script setup lang="ts">
import {ref, reactive, computed } from "vue";
import {
  GetDictionariesList,
  DelDictionaries,
  PutDictionariesItem,
} from "../../servers/db_common";
import {SyncOutlined} from '@ant-design/icons-vue';
import DictionaryModel from "./components/dictionary-model.vue";
import { message } from "ant-design-vue";
let tableState = reactive({
  columns: [
    {
      title: "字典标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "字典类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "字典编码",
      dataIndex: "code",
      key: "code",
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
const getData = () => {
  GetDictionariesList().then((response: any) => {
    tableState.dataSource = response.data;
    console.log(tableState.dataSource);
  });
};
getData();

const Model = {
  isEdit: false,
  data: null,
};

let DictionaryModelRefs = ref(null);

let showDictionaryModel = () => {
  console.log(DictionaryModelRefs);
  Model.isEdit = false;
  Model.data = null;
  DictionaryModelRefs.value.showDrawer(Model);
};

const delDictionaryItem = (item) => {
  console.log(item);
  DelDictionaries({ id: item.id }).then((response: any) => {
    console.log(response);
    if (response.code == 200) {
      message.success("删除成功");
      getData();
    } else {
      message.error("删除失败");
    }
  });
};
const editDictionariesItem = (item) => {
  Model.isEdit = true;
  Model.data = item;
  DictionaryModelRefs.value.showDrawer(Model);
};
</script>
