import UserModel from "@/api/db/models/UserModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"
import { allUsersMw } from "@/types/user/type"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: allUsersMw) => {
      const users = await UserModel.query().withGraphFetched("roleData")

      res.send({ result: users })
    },
  ],
})

export default handler
