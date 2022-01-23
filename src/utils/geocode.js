const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWJ1ZHphbm93c2thIiwiYSI6ImNreWQ3Y3o0djBmMjYydnJtMHd2bzJjcTIifQ.O0gTFO65g4RIAdsfkTW2DQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to map service!", undefined);
    } else if (response.body.message || response.body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
