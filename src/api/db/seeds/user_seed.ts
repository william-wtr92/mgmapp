const knex = require("knex")
const config = require("../../config.ts")
const { hashPassword } = require("../hashPassword.ts")

const seed = async () => {
  const db = knex(config.db)

  await db("product").del()
  await db("category").del()
  await db("user").del()

  const [predefinedPasswordHash, predefinedPasswordSalt] = await hashPassword(
    "MgmProjet992!"
  )
  const predefinedUser = {
    email: "william@quoicoubeh.fr",
    passwordHash: predefinedPasswordHash,
    passwordSalt: predefinedPasswordSalt,
    firstname: "William",
    lastname: "Lim",
    roleId: 2,
  }

  const predefinedCategory = {
    name: "Légumes",
  }

  await db("user").insert(predefinedUser)
  await db("category").insert(predefinedCategory)
}

module.exports = {
  seed,
}
