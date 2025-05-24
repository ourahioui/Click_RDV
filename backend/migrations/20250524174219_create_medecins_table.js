export function up(knex) {
  return knex.schema.createTable('medecins', (table) => {
    table.increments('id').primary();
    table.string('nom').notNullable();
    table.string('prenom').notNullable();
    table.string('email').notNullable().unique();
    table.string('telephone').notNullable();
    table.string('motDePasse').notNullable();
    table.string('specialite').notNullable();
    table.string('ville').notNullable();
    table.integer('experience').notNullable();
    table.string('img_url');
  });
}

export function down(knex) {
  return knex.schema.dropTable('medecins');
}

