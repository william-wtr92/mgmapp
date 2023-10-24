import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema
    .createTable("role", (table: Knex.TableBuilder) => {
      table.increments("id")
      table.text("right").notNullable()
    })
    .then(function () {
      return knex("role").insert([{ right: "caissier" }, { right: "manager" }])
    })  

  await knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('passwordHash').notNullable();
    table.string('passwordSalt').notNullable();
    table.timestamps(true, true);
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.integer("roleId").references("id").inTable("role").defaultTo(1)
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('user');
  await knex.schema.dropTable('role');
};
