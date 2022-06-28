import rquest from "../utils";
import { User } from "../libs/db_user";

// 手机号登录&验证码登录
export const Login = (options: User.LoginParams) => {
  return rquest({
    method: "POST",
    url: "/api/common/login",
    data: options
  })
}

// 注册
export const Register = (options: User.RegisterParams) => {
  return rquest({
    method: "POST",
    url: "/api/common/register",
    data: options
  })
}

// 发送邮箱验证码
export const SendEmailCode = (options: { email: string }) => {
  return rquest({
    method: "GET",
    url: "/api/common/send_email_code",
    data: options
  })
}

// 发送手机验证码
export const SendPhoneCode = (options: { phone: string }) => {
  return rquest({
    method: "GET",
    url: "/api/common/send_phone_code",
    data: options
  })
}

// 获取用户信息
export const GetUserInfo = (options = {}) => {
  return rquest<User.UserInfo>({
    method: "GET",
    url: "/api/common/get_user_info",
    data: options
  })
}

// 修改用户信息
export const LoginOut = (options = {}) => {
  return rquest({
    method: "GET",
    url: "/api/common/login_out",
    data: options
  })
}

// 修改用户信息
export const UpdateUserInfo = (options: User.UpdateUserInfo) => {
  return rquest({
    method: "POST",
    url: "/api/common/update_user_info",
    data: options
  })
}