import UserModel from "@/api/db/models/UserModel"
import { InvalidCredentialsError } from "@/api/error"
import auth from "@/api/middelwares/auth"
import checkIsManager from "@/api/middelwares/checkIsManager"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import {
  mailValidator,
  numberValidator,
  stringValidator,
} from "@/components/validators/basic"
import { addUserMw } from "@/types/user/type"
const { hashPassword } = require("@/api/db/hashPassword.ts")

const handler = mw({
  POST: [
    auth(),
    checkIsManager(),
    validate({
      body: {
        email: mailValidator.required(),
        password: stringValidator.required(),
        firstname: stringValidator.required(),
        lastname: stringValidator.required(),
        roleId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, password, firstname, lastname, roleId },
      },
      res,
    }: addUserMw) => {
      const checkMail = await UserModel.query().findOne({ email })

      if (checkMail) {
        throw new InvalidCredentialsError()
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      const newUser = {
        email,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        firstname,
        lastname,
        roleId,
      }

      await UserModel.query().insert(newUser)

      res.send({ result: true })
    },
  ],
})

export default handler
