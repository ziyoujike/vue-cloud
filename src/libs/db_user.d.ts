export declare namespace User{
  export interface LoginParams {
    password: string;
    phone: string;
    phone_code: string;
  }

  export type RegisterParams = Omit<LoginParams, 'password'>;
}

