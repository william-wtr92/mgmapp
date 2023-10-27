import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: searchProductMw) => {
      const allProducts =
        await ProductModel.query().withGraphFetched("category")
      const countProductByCategory: Record<string, number> = {}

      allProducts.forEach((product: any) => {
        const categoryName = parseInt(product.category?.id) || "Unknown"

        if (!countProductByCategory[categoryName]) {
          countProductByCategory[categoryName] = 0
        }

        countProductByCategory[categoryName] += 1
      })

      res.send({
        result: Object.entries(countProductByCategory).map(
          ([categoryId, count]) => ({
            categoryId,
            count,
          }),
        ),
      })
    },
  ],
})

export default handler
