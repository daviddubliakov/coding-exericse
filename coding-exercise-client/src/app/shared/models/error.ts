export interface ErrorRes {
  location: string;
  msg: string;
  param: FieldParams;
  value: unknown;
}

enum FieldParams {
  EMAIL = "email",
  PASSWORD = "password",
}
