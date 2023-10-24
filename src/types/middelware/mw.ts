export type MethodHandlers = {
  [method: string]: Function | Function[]
}
export interface MyMiddlewareInput {
  locals: {
    body: {
      email: string
      password: string
    }
  }
  res: any
}
