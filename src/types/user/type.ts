export interface addUserMw {
  locals: {
    body: {
      email: string
      password: string
      firstname: string
      lastname: string
      roleId: number
    }
  }
  res: any
}

export interface allUsersMw {
  res: any
}

export interface delUserMw {
  locals: {
    query: {
      userId: number
    }
  }
  res: any
}

export interface patchUserMw {
  locals: {
    query: {
      userId: number
    }
    body: {
      email: string
      firstname: string
      lastname: string
      roleId: number
    }
  }
  res: any
}
