const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;

  const weather_url = "/weather?address=" + encodeURIComponent(location);

  fetch(weather_url)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = "Unable to find location! Try again";
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    })
    .catch(() => {
      messageOne.textContent = "Unable to connect to weather service!";
      messageTwo.textContent = "";
    });
});
