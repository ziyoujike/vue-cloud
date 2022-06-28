import { defineStore } from 'pinia';
import { GetUserInfo, LoginOut } from '@/servers/db_user';
import { User } from "@/libs/db_user";

const localUserInfo = localStorage.getItem("userInfo") || "{}";
const userInfo = localUserInfo ? JSON.parse(localUserInfo) : {};

const localIsLogin = localStorage.getItem("isLogin");
const isLogin = localIsLogin ? JSON.parse(localIsLogin) : false;
export const useUserStore = defineStore('user', {
  state: (): {
    isLogin: boolean;
    userInfo: User.UserInfo
  } => ({
    isLogin,
    userInfo, // 用户信息
  }),
  getters: {},
  actions: {
    async GET_USER_INFO() {
      let res = await GetUserInfo();
      this.userInfo = res.data;
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    },
    async LOGIN_OUT() {
      await LoginOut();
      this.userInfo = {} as User.UserInfo;
      this.isLogin = false;
      for (const key in localStorage) {
        localStorage.removeItem(key);
      }
    },
    SET_ISLOGIN(isLogin: boolean) {
      this.isLogin = isLogin;
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
    }
  }
})