import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { mailValidator, stringValidator } from "@/components/validators/basic"
import jsonwebtoken from "jsonwebtoken"
import { InvalidCredentialsError } from "@/api/error"
const config = require("@/api/config")

interface MyMiddlewareInput {
  locals: {
    body: {
      email: string
      password: string
    }
  }
  res: any
}

const handler = mw({
  POST: [
    validate({
      body: {
        email: mailValidator.required(),
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { email, password },
      },
      res,
    }: MyMiddlewareInput) => {
      const user = await UserModel.query()
        .findOne({ email })
        .withGraphFetched("roleData")

      const validity = await user?.checkPassword(password)

      if (!user || !validity) {
        throw new InvalidCredentialsError()
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
              email: user.email,
              role: user.roleData.right,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: jwt })
    },
  ],
})

export default handler
