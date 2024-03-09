const express = require('express');
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

const router = express.Router();

// [GET] /api/cars - Returns an array of cars sorted by id
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars.sort((a, b) => a.id - b.id)); // Assuming you want to sort by id in ascending order
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cars/:id - Returns a car by the given id
router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.json(req.car); // The car is already attached to req in checkCarId middleware
  } catch (err) {
    next(err);
  }
});

// [POST] /api/cars - Returns the created car
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    console.log("Attempting to create new car with data:", req.body);
    try {
      const newCar = await Cars.create(req.body);
      if (newCar) {
        console.log("New car created:", newCar);
        res.status(201).json(newCar);
        
      } else {
        console.log("Car creation returned undefined or null");
        next(new Error('Car could not be created'));
      }
    } catch (err) {
      console.error("Error during car creation:", err);
      next(err);
    }
  });
  
  
  

module.exports = router;

