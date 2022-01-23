const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const weather_url =
    "http://api.weatherstack.com/current?access_key=929bfe2032770905430e4eeb1bb97da0&query=" +
    `${latitude},${longitude}` +
    "&units=m";

  request({ url: weather_url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } =
        response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees outsite, but if feels like ${feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
