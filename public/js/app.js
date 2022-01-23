const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;

  const weather_url =
    "http://api.weatherstack.com/current?access_key=929bfe2032770905430e4eeb1bb97da0&query=" +
    encodeURIComponent(location) +
    "&units=m";

  fetch(weather_url)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = "Unable to find location! Try again";
          messageTwo.textContent = "";
        } else {
          const {
            current: { weather_descriptions, temperature, feelslike },
            location: { name, country },
          } = data;
          messageOne.textContent = `${name}, ${country}`;
          messageTwo.textContent = `${weather_descriptions[0]}. It is currently ${temperature} degrees outsite, but if feels like ${feelslike} degrees.`;
        }
      });
    })
    .catch(() => {
      messageOne.textContent = "Unable to connect to weather service!";
      messageTwo.textContent = "";
    });
});
