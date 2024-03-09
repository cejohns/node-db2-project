exports.up = function(knex) {
  // Create the cars table
  return knex.schema.createTable('cars', table => {
    table.increments('id'); // Creates an auto-incrementing column named id
    table.string('vin').unique().notNullable(); // VIN number, must be unique and is required
    table.string('make').notNullable(); // Car make is required
    table.string('model').notNullable(); // Car model is required
    table.decimal('mileage').notNullable(); // Mileage is required, decimal to accommodate precise values
    table.string('title'); // Title status, optional
    table.string('transmission'); // Transmission type, optional
  });
};

exports.down = function(knex) {
  // Drop the cars table
  return knex.schema.dropTableIfExists('cars');
};
