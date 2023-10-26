import UserModel from "../db/models/UserModel"

const checkIsManager = () => {
  return async (ctx: any) => {
    const { next, locals, res, logger } = ctx

    const user = (await UserModel.query()
      .withGraphFetched("roleData")
      .where("id", locals.user.id)) as any

    try {
      if (user[0].roleData.right !== "manager") {
        res.status(403).send({ error: "Forbidden" })

        return
      }

      next()
    } catch (error) {
      logger.error(error)

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  }
}

export default checkIsManager
