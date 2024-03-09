const express = require('express');
const app = express();
const carsRouter = require('./cars/cars-router');


app.use(express.json()); // This line is crucial

app.use('/api/cars', carsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

  
  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Comment out the app.listen call if you plan to call it from another file
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app; // Export the Express app

