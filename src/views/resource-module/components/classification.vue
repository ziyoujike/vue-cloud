<template>
     <a-form ref="formRef" :model="formState" :rules="rules" labelAlign="left">
          <a-form-item label="标题" name="title">
            <a-input v-model:value="formState.title" placeholder="请输入标题" />
          </a-form-item>
          <a-form-item label="desc" name="desc">
            <a-input
              v-model:value="formState.desc"
              placeholder="请输入desc"
            />
          </a-form-item>
          <a-form-item label="路径" name="img_url">
            <a-input
              v-model:value="formState.img_url"
              placeholder="请输入路径"
            />
          </a-form-item>
            <a-form-item label="link" name="link" v-if='props.isShowResources'>
            <a-input
              v-model:value="formState.link"
              placeholder="请输入link"
            />
          </a-form-item>
              <a-form-item label="sort" name="sort"  v-if='props.isShowResources'>
            <a-input
              v-model:value="formState.sort"
              placeholder="请输入sort"
            />
          </a-form-item>
          <!-- resources_classify_id -->
          <a-form-item label="资源分类id" name="resources_classify_id"  v-if='props.isShowResources'>
            <!-- <a-input
              v-model:value="formState.resources_classify_id"
              placeholder="请输入资源分类id"
            /> -->
            <a-select
            v-model:value="values"
            style="width: 100%"
            @change="handleChange"
            >
                <a-select-option v-for="item in props.selectList" :key="item.id">
                            {{item.title}}
                </a-select-option>
            </a-select>
          </a-form-item>

      <!-- isShowResources -->
    </a-form>
    <a-row type="flex" justify="start">
      <a-button
        class="margin-right-10"
        type="primary"
        @click="onSubmit"
        :loading="formState.loading"
      >确定</a-button>
      <a-button style="border-radius: 8px;" @click="cancel" type="primary">取消</a-button>
    </a-row>
</template>
<script lang="ts" setup>
import { reactive,ref, PropType } from 'vue';
const props = defineProps({
    // 是新增资源分类还是新增资源
    isShowResources: {
        type: Boolean,
        default: false,
    },
    selectList: {
        type: Array as PropType<{
            id: number;
            title: string;
        }[]>,
           default: () => {
            return []
            }
    },
})
// closeVisible
const emit= defineEmits(['closeVisible','onSubmitVisible'])
const rules = {
  title: [
    {
      required: true,
      trigger: "change",
      message: "请输入标题!",
    },
  ],
    desc: [
    {
      required: true,
      trigger: "change",
      message: "请输入desc",
    },
  ],
      img_url: [
    {
      required: true,
      trigger: "change",
      message: "请输入img_url",
    },
  ],
        link: [
    {
      required: true,
      trigger: "change",
      message: "请输入link",
    },
  ],
    sort: [
    {
      required: true,
      trigger: "change",
      message: "请输入sort",
    },
  ],
      resources_classify_id: [
    {
      required: true,
      trigger: "change",
      message: "请输入资源分类id",
    },
  ],
};
const values = ref<string>('')
const formState = reactive({
  title: '', //标题
  desc: '', // desc
  img_url: '',
  sort:'', // sort
  link:'', // link
  resources_classify_id:'', // 资源分类id
  loading: false,
});

const handleChange = (value: string) => {
   console.log(`selected ${value}`);
   formState.resources_classify_id =value
};
const formRef = ref();
// 提交
const onSubmit = () => {
  formRef.value
    .validate()
    .then( async() => {
            emit('onSubmitVisible',formState)
    }
    )
    .catch(() => {
      console.log("error");
    });
};
// 取消
const cancel =()=>{
     emit('closeVisible')
}
</script>