export declare namespace User{
  export interface LoginParams {
    password: string;
    phone: string;
    phone_code: string;
  }

  export type RegisterParams = Omit<LoginParams, 'password'>;

  export interface UserInfo {
    avatar_url: string;
    email:      string;
    id:         string;
    phone:      string;
    user_name:  string;
    loading?:   boolean;
  }

  export type UpdateUserInfo = Omit<UserInfo, 'id' | 'phone'>;
}

