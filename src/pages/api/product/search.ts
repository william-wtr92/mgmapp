import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middelwares/auth"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { stringValidator } from "@/components/validators/basic"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    auth(),
    validate({
      query: {
        search: stringValidator.optional(),
      },
    }),
    async ({
      locals: {
        query: { search },
      },
      res,
    }: searchProductMw) => {
      let products
      const searchTransform = search.toLowerCase()

      if (searchTransform.length >= 2) {
        products = await ProductModel.query()
          .select()
          .whereRaw('LOWER("name") LIKE ?', `%${searchTransform}%`)
          .withGraphFetched("category")
      }

      res.send({ result: products })
    },
  ],
})

export default handler
