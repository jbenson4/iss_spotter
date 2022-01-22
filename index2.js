const { nextISSFlyoverTimesForMyLocation } = require('./iss_promised');

nextISSFlyoverTimesForMyLocation()
  .catch((error) => {
    console.log("It didn't work!: ", error.message);
  });