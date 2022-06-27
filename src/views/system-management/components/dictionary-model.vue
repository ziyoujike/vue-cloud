<template>
  <a-drawer
    v-model:visible="visible"
    destroyOnClose
    class="custom-class"
    title="新增字典"
    placement="right"
    width="500"
    @after-visible-change="afterVisibleChange"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="字典标题" v-bind="validateInfos.title">
        <a-input v-model:value="modelRef.title" />
      </a-form-item>
      <a-form-item label="字典类型" v-bind="validateInfos.type">
        <a-input v-model:value="modelRef.type" />
      </a-form-item>
      <a-form-item label="字典编码" v-bind="validateInfos.code">
        <a-input v-model:value="modelRef.code" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
        <a-button type="primary" @click.prevent="onSubmit">提交</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import { message } from "ant-design-vue";
import { AddDictionaries, PutDictionariesItem } from "@/servers/db_common";
import { dataEcho } from "@/utils/main";
const visible = ref<boolean>(false);
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
const afterVisibleChange = (bool: boolean) => {
  console.log("visible", bool);
};
let Model = null;
let modelRef = reactive({
  id: "",
  title: "",
  type: "",
  code: "",
  icon_url: "",
});
const rulesRef = reactive({
  title: [
    {
      required: true,
      message: "字典标题不能为空",
    },
  ],
  type: [
    {
      required: true,
      message: "字典类型不能为空",
    },
  ],
  code: [
    {
      required: true,
      message: "字典编码不能为空",
    },
  ],
});
let labelCol = reactive({
  span: 6,
});
let wrapperCol = reactive({
  span: 18,
});

const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});
const showDrawer = (options) => {
  visible.value = true;
  Model = options;
  if (Model.isEdit) {
    dataEcho(modelRef, Model.data);
  } else {
    resetFields();
  }
};
const emit = defineEmits(["emitGetData"]);
const onSubmit = () => {
  validate()
    .then(() => {
      if (!Model.isEdit) {
        AddDictionaries(toRaw(modelRef)).then((response) => {
          if (response.code == 200) {
            message.success("新增成功");
            visible.value = false;
            emit("emitGetData");
            resetFields();
          } else {
            message.error("新增失败");
          }
        });
      } else {
        PutDictionariesItem(toRaw(modelRef)).then((response: any) => {
          console.log(response);
          if (response.code == 200) {
            message.success("修改成功");
            visible.value = false;
            emit("emitGetData");
            resetFields();
          } else {
            message.error("修改失败");
          }
        });
      }
    })
    .catch((err) => {
      message.error(err);
    });
};
defineExpose({
  showDrawer,
});
</script>

