const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mary",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mary",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "HELP!",
    name: "Mary",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        res.send({ error });
        return;
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
          return;
        }
        res.send({
          location,
          forecastData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    message: "help article not found",
    name: "Mary",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "this page does not exist",
    name: "Mary",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
