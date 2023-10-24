import * as yup from "yup"
import { InvalidNewPasswordError, NotFoundError } from "../error"
import { NextApiRequest, NextApiResponse } from "next"

interface MyNextApiRequest extends NextApiRequest {
  params: { [key: string]: string }
}

interface Ctx {
  req: MyNextApiRequest
  res: NextApiResponse
  next: Function
  locals: any
}

const validate = ({
  body,
  params,
  query,
}: {
  body?: object
  params?: object
  query?: object
}) => {
  const validator = yup.object().shape({
    ...(body ? { body: yup.object().shape(body as yup.ObjectShape) } : {}),
    ...(params
      ? { params: yup.object().shape(params as yup.ObjectShape) }
      : {}),
    ...(query ? { query: yup.object().shape(query as yup.ObjectShape) } : {}),
  })

  return async (ctx: Ctx) => {
    const { req, res, next } = ctx as {
      req: MyNextApiRequest
      res: NextApiResponse
      next: any
    }

    try {
      const { body, params, query } = await validator.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        { abortEarly: false }
      )

      ctx.locals = {
        body,
        params,
        query,
      }

      await next()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        res.status(422).send({ error: err.errors })

        return
      }

      if (err instanceof NotFoundError) {
        res.status(404).send({ error: err.errors![0] })

        return
      }

      if (err instanceof InvalidNewPasswordError) {
        res.status(422).send({ error: err.errors![0] })

        return
      }

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  }
}

export default validate
