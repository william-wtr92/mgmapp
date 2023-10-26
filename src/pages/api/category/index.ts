import CategoryModel from "@/api/db/models/CategoryModel"
import { InvalidArgumentError } from "@/api/error"
import auth from "@/api/middelwares/auth"
import validate from "@/api/middelwares/validate"
import mw from "@/api/mw"
import { stringValidator } from "@/components/validators/basic"
import { addCategoryMw } from "@/types/category/Type"

const handler = mw({
  POST: [
    auth(),
    validate({
      body: {
        name: stringValidator.required()
      }
    }),
    async ({
      locals: {
        body: { name }
      },
      res
    }: addCategoryMw) => {
      const checkCategory = await CategoryModel.query().findOne({ name })

      if (checkCategory !== undefined) {
        res.status(500).send({ message: "Category with this name already exists" })

        return;
      }

      const addedCategory = await CategoryModel.query().insert({ 
        name
      })

      res.send({ result: addedCategory })
    },
  ],
})

export default handler
