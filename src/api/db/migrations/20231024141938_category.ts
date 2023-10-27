import { Knex } from "knex"

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("category", (table: Knex.TableBuilder) => {
    table.increments("id").primary()
    table.string("name").notNullable()
  })
}

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("category")
}
