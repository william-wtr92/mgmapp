import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: any) => {
      const lastStockProduct = await ProductModel.query()
        .orderBy("stock", "asc")
        .limit(4)

      res.send({ result: lastStockProduct })
    },
  ],
})


export default handler
