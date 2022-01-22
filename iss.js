const request = require('request');

const fetchMyIP = function(callback) {
  const apiUrl = 'https://api.ipify.org?format=json';
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const geoAPI = `https://freegeoip.live/json/${ip}`;
  request(geoAPI, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coords = {};
    coords.latitude = JSON.parse(body).latitude;
    coords.longitude = JSON.parse(body).longitude;
    callback(null, coords);
  });
};

const fetchFlyoverTimes = function(coordObj, callback) {
  const flyAPI = `https://iss-pass.herokuapp.com/json/?lat=${coordObj.latitude}&lon=${coordObj.longitude}`;
  request(flyAPI, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSFlyoverTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchFlyoverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSFlyoverTimesForMyLocation,
};