import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import { allUsersMw } from "@/types/user/type"

const handler = mw({
  GET: [
    async ({ res }: allUsersMw) => {
      const users = await UserModel.query().select(
        "email",
        "firstname",
        "lastname",
        "roleId"
      )

      res.send({ result: users })
    },
  ],
})

export default handler
