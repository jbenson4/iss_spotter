const request = require('request-promise-native');

const fetchMyIP = function() {
  const apiUrl = 'https://api.ipify.org?format=json';
  return request(apiUrl);
};

const fetchCoordsByIP = function(ip) {
  const parsed = JSON.parse(ip).ip;
  const geoAPI = `https://freegeoip.live/json/${parsed}`;
  return request(geoAPI);
};

const fetchISSFlyoverTimes = function(geo) {
  const parsedGeo = JSON.parse(geo);
  const flyAPI = `https://iss-pass.herokuapp.com/json/?lat=${parsedGeo.latitude}&lon=${parsedGeo.longitude}`;
  return request(flyAPI);
};

const dateTimeFormatter = function(passTimes) {
  const parsedTimes = JSON.parse(passTimes).response;
  parsedTimes.forEach((obj) => {
    const duration = obj.duration;
    const date = new Date(obj.risetime * 1000);
    return console.log(`Next pass at ${date.toString()} for ${duration} seconds!`);
  });
};


const nextISSFlyoverTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then(dateTimeFormatter);
};

module.exports = {
  nextISSFlyoverTimesForMyLocation,
};