const db = require('../../data/db-config'); 

const getAll = () => {
  // Returns an array of all car records in the cars table
  return db('cars');
};

const getById = (id) => {
  // Returns a single car record matching the given id
  return db('cars').where({ id }).first();
};


const getByVin = (vin) => {
  return db('cars').where({ vin }).first();
};

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return db('cars').where({ id }).first();
};




module.exports = {
  getAll,
  getById,
  getByVin,
  create,
};
