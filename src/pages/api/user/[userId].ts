import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/error"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { numberValidator, stringValidator } from "@/components/validators/basic"
import { delUserMw, patchUserMw } from "@/types/user/type"

const handler = mw({
  DELETE: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }: delUserMw) => {
      const checkUser = UserModel.query().findOne({ userId })

      if (!checkUser) {
        throw new NotFoundError()
      }

      await UserModel.query().deleteById(userId)

      res.send({ result: true })
    },
  ],
  PATCH: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
      body: {
        email: stringValidator.required(),
        firstname: stringValidator.required(),
        lastname: stringValidator.required(),
        roleId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { email, firstname, lastname, roleId },
      },
      res,
    }: patchUserMw) => {
      const user = UserModel.query().findOne({ userId })

      if (!user) {
        throw new NotFoundError()
      }

      await UserModel.query().patchAndFetchById(userId, {
        ...(email ? { email } : {}),
        ...(firstname ? { firstname } : {}),
        ...(lastname ? { lastname } : {}),
        ...(roleId ? { roleId } : {}),
      })

      res.send({ result: true })
    },
  ],
})

export default handler