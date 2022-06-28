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