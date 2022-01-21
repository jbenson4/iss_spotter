const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
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

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};