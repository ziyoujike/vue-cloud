<template>
  <div class="login-container">
    <div class="form-wrap">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
      >
        <a-form-item name="phone">
          <a-input class="line-height-36" v-model:value="formState.phone" placeholder="手机号">
            <template #prefix><UserOutlined style="color: #889aa4" /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" v-if="status === 'password'">
          <a-input class="line-height-36" v-model:value="formState.password" 
            type="password" placeholder="密码" @keydown.enter="onSubmit"
          >
            <template #prefix><LockOutlined style="color: #889aa4" /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="phone_code" v-else>
          <code-input 
            v-model:value="formState.phone_code"
            :account="formState.phone"
            @enter="onSubmit"
          ></code-input>
        </a-form-item>
        <a-form-item>
          <a-button 
            class="btn-height-36" :loading="loading" type="primary" 
            @click="onSubmit" v-if="status === 'password'"
          >密码登录</a-button>
          <a-button 
            class="btn-height-36" :loading="loading" type="primary" 
            @click="onSubmit" v-else-if="status === 'phone'"
          >手机号验证登录</a-button>
          <a-button 
            class="btn-height-36" :loading="loading" type="primary" 
            @click="onSubmit" v-else
          >注册并登录</a-button>
        </a-form-item>
      </a-form>
      <div class="bottom-text flex-s-b">
        <a @click="status = 'phone'" v-if="status === 'register'">返回登录</a>
        <a @click="status = 'register'" v-else>没有账号？立即注册</a>

        <a @click="status = 'password'" v-if="status === 'phone'">密码登录</a>
        <a @click="status = 'phone'" v-if="status === 'password'">手机号验证登录</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, ref, UnwrapRef } from 'vue';
import { Login, Register } from '@/servers/db_user';
import CodeInput from "@/components/code-input.vue";
import { User } from "@/libs/db_user";
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const status = ref<'register' | 'password' | 'phone'>("password");
const formRef = ref();
const loading = ref<boolean>(false);
const formState: UnwrapRef<User.LoginParams> = reactive({
  password: "",
  phone: "",
  phone_code: "",
})
const onSubmit = () => {
	formRef.value
		.validate()
		.then(() => {
      login();
		})
		.catch(() => {
			console.log("error");
		});
};
const login = async() => {
  try {
    let requestFun = status.value === 'register' ? Register : Login;
    loading.value = true;
    let res = await requestFun(formState);
    loading.value = false;
    message.success(res.message);
    router.push('/');
  } catch (error) {
    loading.value = false;
  }
}

// 校验规则
const rules = {
	phone: {
		required: true,
		message: "请输入手机号!"
	},
	password: {
		required: true,
		message: "请输入密码!"
	},
  phone_code: {
		required: true,
		message: "请输入验证码!"
	},
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  background-color: #2d3a4b;
  width: 100%;
  min-height: 100vh;

  .form-wrap {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    padding: 30px 35px;
    width: 100%;
    max-width: 520px;
    overflow: hidden;
  }
  
  .bottom-text > a {
    font-size: 12px;
    color: #fff !important;
  }
}

:deep(.ant-input-affix-wrapper) {
  background-color: transparent !important;
  border: 1px solid hsla(0,0%,100%,.1) !important;

  .ant-input {
    background-color: transparent !important;
    color: #fff !important;
  }
}
</style>
