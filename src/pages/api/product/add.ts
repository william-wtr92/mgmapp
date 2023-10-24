import CategoryModel from "@/api/db/models/CategoryModel"
import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/error"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { numberValidator, stringValidator } from "@/components/validators/basic"
import { addProductMw, searchProductMw } from "@/types/product/type"

const handler = mw({
  POST: [
    validate({
      body: {
        name: stringValidator.required(),
        desc: stringValidator.required(),
        stock: numberValidator.required(),
        categoryId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { name, desc, stock, categoryId },
      },
      res,
    }: addProductMw) => {
      const checkCategory = CategoryModel.query().findOne({ categoryId })

      if (!checkCategory) {
        throw new NotFoundError()
      }

      await ProductModel.query().insertAndFetch({
        name,
        desc,
        stock,
        categoryId,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    async ({ res }: searchProductMw) => {
      const products = await ProductModel.query().select()

      res.send({ result: products })
    },
  ],
})

export default handler
