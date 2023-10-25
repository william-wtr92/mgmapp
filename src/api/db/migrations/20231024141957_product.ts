import { Knex } from "knex"

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("product", (table: Knex.TableBuilder) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.text("desc").notNullable()
    table.integer("stock").notNullable()
    table.timestamps(true, true, true)
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .defaultTo(1)
  })
}

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("product")
}
