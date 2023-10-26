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

  const predefinedCategories = [
    {
      name: "Légumes",
    },
    {
      name: "Fruit",
    },
    {
      name: "Féculents",
    },
  ]

  const insertedCategories = await db("category")
    .insert(predefinedCategories)
    .returning("id")

  const categoryIds = insertedCategories.map((category: any) => {
    return typeof category === "object" ? category.id : category
  })

  const predefinedProducts = [
    {
      name: "Fraise",
      desc: "Ma belle Fraise ronde et rouge",
      stock: 15,
      categoryId: categoryIds[1],
    },
    {
      name: "Framboise",
      desc: "Framboise de saison caliente papiiii",
      stock: 100,
      categoryId: categoryIds[1],
    },
    {
      name: "Banane",
      desc: "Bonne banane bien jaune",
      stock: 120,
      categoryId: categoryIds[1],
    },
    {
      name: "Raisin",
      desc: "Raisin sans pépain du Groenland",
      stock: 500,
      categoryId: categoryIds[1],
    },
    {
      name: "Courgette",
      desc: "Courgette verte pas chez",
      stock: 78,
      categoryId: categoryIds[0],
    },
    {
      name: "Haricots verts",
      desc: "Bon prix au kg",
      stock: 34,
      categoryId: categoryIds[0],
    },
    {
      name: "Carrote",
      desc: "Le meilleur légume",
      stock: 10,
      categoryId: categoryIds[0],
    },
    {
      name: "Poivron",
      desc: "3 couleurs dispo ",
      stock: 50,
      categoryId: categoryIds[0],
    },
    {
      name: "Pates",
      desc: "Pene, et tout le bazar dispo ",
      stock: 1500,
      categoryId: categoryIds[2],
    },
    {
      name: "Riz",
      desc: "Riz bien carré de l'oncle Bens",
      stock: 12,
      categoryId: categoryIds[2],
    },
    {
      name: "Pomme de terre",
      desc: "Bien jaune, mange pas avec la peau ",
      stock: 67,
      categoryId: categoryIds[2],
    },
  ]

  await db("user").insert(predefinedUser)
  await db("product").insert(predefinedProducts)
}

module.exports = {
  seed,
}
