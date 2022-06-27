<template>
  <a-drawer
    v-model:visible="visible"
    destroyOnClose
    class="custom-class"
    title="新增资源"
    placement="right"
    width="800"
    @after-visible-change="afterVisibleChange"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="资源图标" v-bind="validateInfos.icon_url">
        <a-upload
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="customRequest"
        >
          <img
            class="upload-img"
            v-if="modelRef.icon_url"
            :src="modelRef.icon_url"
            style="width: 102px; height: 102px"
            alt="avatar"
          />
          <div v-else>
            <plus-outlined></plus-outlined>
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <!-- <a-input v-model:value="modelRef.icon_url" /> -->
      </a-form-item>
      <a-form-item label="资源标题" v-bind="validateInfos.title">
        <a-input v-model:value="modelRef.title" />
      </a-form-item>
      <a-form-item label="资源类型" v-bind="validateInfos.resources_type">
        <a-select
          v-model:value="modelRef.resources_type"
          style="width: 100%"
          placeholder="请选择资源类型"
        >
          <a-select-option v-for="item in ResourcesType" :value="item.code">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="资源链接" v-bind="validateInfos.link">
        <a-input v-model:value="modelRef.link" />
      </a-form-item>

      <a-form-item label="排序" v-bind="validateInfos.sort">
        <a-input-number v-model:value="modelRef.sort" style="width: 100%" />
      </a-form-item>
      <a-form-item label="备注信息" v-bind="validateInfos.remark">
        <a-textarea v-model:value="modelRef.remark" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">提交</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import { message } from "ant-design-vue";
import { AddResourcesItem, PutResourcesItem } from "@/servers/db_docs";
import { qiniuUploadFile } from "@/utils/upload-file";
import { dataEcho, dictionaries } from "@/utils/main";
import { PlusOutlined } from "@ant-design/icons-vue";
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
  resources_type: null,
  link: "",
  remark: "",
  icon_url: "",
  sort: null,
});
const ResourcesType = dictionaries("Resources_Type");
const rulesRef = reactive({
  title: [
    {
      required: true,
      message: "资源标题不能为空",
    },
  ],
  resources_type: [
    {
      required: true,
      message: "资源类型不能为空",
    },
  ],
  link: [
    {
      required: true,
      message: "资源链接不能为空",
    },
  ],
  icon_url: [
    {
      required: true,
      message: "资源图标不能为空",
    },
  ],
  sort: [
    {
      required: true,
      message: "排序不能为空",
    },
  ],
});
let labelCol = reactive({
  span: 4,
});
let wrapperCol = reactive({
  span: 20,
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

// 上传图片
const customRequest = (event) => {
  qiniuUploadFile(event.file).then((response) => {
    if (response.code == 200) {
      message.success(response.message);
      // formRef.value.validateFields(["headPic"]);
      modelRef.icon_url = response.result;
    } else {
      message.error(response.message);
    }
  });
};
const onSubmit = () => {
  validate()
    .then(() => {
      if (!Model.isEdit) {
        AddResourcesItem(toRaw(modelRef)).then((response) => {
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
        PutResourcesItem(toRaw(modelRef)).then((response: any) => {
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

