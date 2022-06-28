<template>
  <div class="flex-s-b">
    <div class="logo color-fff">
      LOGO
    </div>
    
    <a-dropdown class="hover-com">
      <div class="ant-dropdown-link flex-center">
        <p style="margin: 0 10px; color: #fff; max-width: 170px;" class="text-overflow1">
          Hi~
          <span class="username" v-if="userInfo">{{ userInfo.phone || '--' }}</span>
          <span class="username" v-else>请登录</span>
        </p>
        <a-avatar size="40" :src="userInfo && userInfo.avatar_url">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
      <template #overlay>
        <a-menu style="padding-top: 6px">
          <a-menu-item @click="router.push('/personal/personal-center')">
            <UserOutlined />
            <span style="padding-left: 10px">个人中心</span>
          </a-menu-item>
					<a-menu-divider />
          <a-menu-item @click="loginOut">
            <LogoutOutlined />
            <span style="padding-left: 10px">退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const loginOut = async () => {
  userStore.LOGIN_OUT();
  router.replace("/login");
}
</script>

<style scoped lang="scss">
.hover-com {
	cursor: pointer;
	transition: all 0.3s ease-out;

	&:hover {
		background-color: #002442;
	}
}
</style>
