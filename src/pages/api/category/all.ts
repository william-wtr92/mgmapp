import CategoryModel from "@/api/db/models/CategoryModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: searchProductMw) => {
      const categories = await CategoryModel.query().select()

      res.send({ result: categories })
    },
  ],
})

export default handler
