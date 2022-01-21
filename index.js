const { fetchMyIP, fetchCoordsByIP, fetchFlyoverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP address: ', ip);
});

const exampleIP = '172.103.163.84';

fetchCoordsByIP(exampleIP, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned coordinates: ', data);
});

const coordinates = {latitude: 49.1838, longitude: -121.9046};

fetchFlyoverTimes(coordinates, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned flyover times: ', data);
});