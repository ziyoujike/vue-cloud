import { defineStore } from 'pinia';
import { GetUserInfo } from '@/servers/db_user';
const localUserInfo = localStorage.getItem("userInfo") || "{}";
const userInfo = localUserInfo ? JSON.parse(localUserInfo) : null;

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem("token") || null,
    userInfo, // 用户信息
  }),
  getters: {},
  actions: {
    async GET_USER_INFO() {
      let res = await GetUserInfo();
      this.userInfo = res.data;
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    }
  }
})