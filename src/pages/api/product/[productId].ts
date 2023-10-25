import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/error"
import auth from "@/api/middelwares/auth"
import checkIsManager from "@/api/middelwares/checkIsManager"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { numberValidator, stringValidator } from "@/components/validators/basic"
import { delProductMw, patchProductMw } from "@/types/product/type"

const handler = mw({
  DELETE: [
    auth(),
    checkIsManager(),
    validate({
      query: {
        productId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }: delProductMw) => {
      const checkProduct = ProductModel.query().findOne({ productId })

      if (!checkProduct) {
        throw new NotFoundError()
      }

      await ProductModel.query().deleteById(productId)

      res.send({ result: true })
    },
  ],
  PATCH: [
    auth(),
    checkIsManager(),
    validate({
      query: {
        productId: numberValidator.required(),
      },
      body: {
        name: stringValidator.required(),
        desc: stringValidator.required(),
        stock: numberValidator.required(),
        categoryId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: { name, desc, stock, categoryId },
      },
      res,
    }: patchProductMw) => {
      const product = ProductModel.query().findOne({ productId })

      if (!product) {
        throw new NotFoundError()
      }

      await ProductModel.query().patchAndFetchById(productId, {
        ...(name ? { name } : {}),
        ...(desc ? { desc } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(stock ? { stock } : {}),
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth(),
    validate({
      query: {
        productId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }: delProductMw) => {
      const product = await ProductModel.query().findOne({ id: productId })

      if (!product) {
        throw new NotFoundError()
      }

      res.send({ result: product })
    },
  ],
})

export default handler
