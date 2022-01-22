const { nextISSFlyoverTimesForMyLocation } = require('./iss');

const dateTimeFormatter = function(passTimes) {
  passTimes.forEach((obj) => {
    const duration = obj.duration;
    const date = new Date(obj.risetime * 1000);
    console.log(`Next pass at ${date.toString()} for ${duration} seconds!`);
    })
}

nextISSFlyoverTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  dateTimeFormatter(passTimes)
});
