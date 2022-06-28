export declare namespace API {
  interface ResponseType<T> {
    code: number;
    data: T;
    message: string;
  }
}