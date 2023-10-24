export interface addProductMw {
  locals: {
    body: {
      name: string
      desc: string
      stock: number
      categoryId: number
    }
  }
  res: any
}

export interface patchProductMw {
  locals: {
    query: {
      productId: number
    }
    body: {
      name: string
      desc: string
      stock: number
      categoryId: number
    }
  }
  res: any
}

export interface delProductMw {
  locals: {
    query: {
      productId: number
    }
  }
  res: any
}

export interface searchProductMw {
  res: any
}
