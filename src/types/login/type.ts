export interface signInMw {
  locals: {
    body: {
      email: string
      password: string
    }
  }
  res: any
}
