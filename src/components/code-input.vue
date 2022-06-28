<template>
  <div>
    <a-input
      v-model:value="inputValue"
      placeholder="请输入验证码"
      autocomplete="off"
      class="line-height-36"
      @change="handleChange"
      @keydown.enter="emit('enter')"
    >
      <template #suffix>
        <a-button
          class="suffix-autoCode blue-color font-size-12"
          size="small"
          :loading="loading"
          @click="checkAutoCode"
        >
          <template v-if="codeStatus == 'init'">获取验证码</template>
          <template v-else-if="codeStatus == 'loading'">获取中</template>
          <template v-else>{{ countDownTime }}s重新获取</template>
        </a-button>
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { message } from "ant-design-vue";
import { SendPhoneCode } from '@/servers/db_user';

const apiOptions: {
  [key: string]: any
} = {
  // 手机验证码
  sendPhone: SendPhoneCode
}

const props = defineProps({
  account: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "sendPhone"
  },
  // 手机号字段名
  accountName: {
    type: String,
    default: "phone"
  },
})

const emit = defineEmits(['update:value', 'enter', 'success']);
const inputValue = ref<string>("");
const codeStatus = ref<string>('init');
const countDownTime = ref<number>(0);
let loading = ref<boolean>(false);
let timer: number;

// 更新父组件的值
let handleChange = () => {
  emit('update:value', inputValue.value);
}

// 验证码请求
const run = async () => {
  try {
    loading.value = true;
    let data: { [key: string]: string } = {};
    data[props.accountName] = props.account;
    let res = await apiOptions[props.type](data);
    loading.value = false;
    emit('success', data);
    message.success(res.message);
    codeStatus.value = "countDown";
    countDown();
  } catch (error) {
    codeStatus.value = "init";
    loading.value = false;
  }
}

// 校验是否输入手机号
const checkAutoCode = () => {
  if (codeStatus.value !== "init") return;
  if (!props.account) return message.error("手机号不正确");
  codeStatus.value = "loading";
  run();
}
// 倒计时
const countDown = () => {
  countDownTime.value = 60;
  timer = setInterval(() => {
    countDownTime.value--;
    if (countDownTime.value <= 0) {
      countDownEnd();
      return
    }
  }, 1000)
}
// 倒计时结束
const countDownEnd = () => {
  timer && clearInterval(timer);
  codeStatus.value = "init";
}
// 页面卸载
onBeforeUnmount(() => {
  countDownEnd();
})

// 清空inputValue
const reset = () => {
  countDownEnd();
  inputValue.value = "";
  emit('update:value', inputValue.value);
}

defineExpose({
  reset
})
</script>

<style scoped lang="scss">
:deep(.ant-input-affix-wrapper) {
  .ant-btn {
    background: transparent !important;
    color: #fff !important;
    border-color: transparent !important;

    &::before {
      background: transparent !important;
    }
  }
}
</style>
