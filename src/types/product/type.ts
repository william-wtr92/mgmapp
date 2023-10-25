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
  locals: {
    query: {
      search: string
    }
  }
  res: any
}

export interface Product {
  name: string
  desc: string
  stock: number
  categoryId: number
}
