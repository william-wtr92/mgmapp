import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { stringValidator } from "@/components/validators/basic"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
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

      if (search.length >= 2) {
        products = await ProductModel.query()
          .select()
          .whereRaw('LOWER("name") LIKE ?', `%${search}%`)
      }

      res.send({ result: products })
    },
  ],
})

export default handler
