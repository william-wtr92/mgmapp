import { MethodHandlers } from "@/types/middelware/mw"
import BaseModel from "@/api/db/models/BaseModel"
import knex from "knex"
import { NextApiRequest, NextApiResponse } from "next"
import deepmerge from "deepmerge"
const config = require("./config.ts")

const db = knex(config.db)
BaseModel.knex(db)

const mw =
  (methodHandlers: MethodHandlers) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const methodHandler = methodHandlers[req.method!]

    if (!methodHandler) {
      res.status(405).send({ error: "method not allowed" })

      return
    }

    const handlers = Array.isArray(methodHandler)
      ? methodHandler
      : [methodHandler]
    let handlerIndex = 0
    const locals = {}
    const ctx = {
      db,
      req,
      res,
      get locals() {
        return locals
      },
      set locals(newLocals) {
        Object.assign(locals, deepmerge(locals, newLocals))
      },
      next: async () => {
        const handler = handlers[handlerIndex]
        handlerIndex += 1

        await handler(ctx)
      },
    }

    await ctx.next()
  }

export default mw
