import CategoryModel from "@/api/db/models/CategoryModel"
import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/error"
import auth from "@/api/middelwares/auth"
import checkIsManager from "@/api/middelwares/checkIsManager"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { numberValidator, stringValidator } from "@/components/validators/basic"
import { addProductMw } from "@/types/product/type"

const handler = mw({
  POST: [
    auth(),
    checkIsManager(),
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
})

export default handler
