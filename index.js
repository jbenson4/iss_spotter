const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

const addressIP = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
});

fetchCoordsByIP('172.103.163.84', (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(data);
} )