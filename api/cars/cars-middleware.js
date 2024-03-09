const Cars = require('./cars-model'); // Adjust the path as necessary
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    }
    req.car = car; // Make the car available to downstream middleware or handlers
    next();
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) return res.status(400).json({ message: "vin is missing" });
  if (!make) return res.status(400).json({ message: "make is missing" });
  if (!model) return res.status(400).json({ message: "model is missing" });
  if (!mileage) return res.status(400).json({ message: "mileage is missing" });
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    return res.status(400).json({ message: `vin ${vin} is invalid` });
  }
  next();
};

async function checkVinNumberUnique(req, res, next) {
  const { vin } = req.body;
  try {
    const existingCar = await Cars.getByVin(vin); // Use the getByVin function to check if the VIN exists
    if (existingCar) {
      return res.status(400).json({ message: `vin ${vin} already exists` });
    }
    next();
  } catch (error) {
    next(error); // Forward any unexpected errors to the error handling middleware
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
