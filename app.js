const express = require("express");
const https = require("https");
const ejs = require("ejs");
const { resolveSoa } = require("dns");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var apiKey = "your api key";
var unit = "metric";

app.get("/paris", function(req, res){
  const query = "Paris";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        res.render("paris", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
        });
      });
    });
});

app.get("/newyork", function(req, res){
  const query = "New York City";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        res.render("newyork", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
        });
      });
    });
});

app.get("/london", function(req, res){
  const query = "London";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        res.render("london", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
        });
      });
    });
});

app.get("/", function (req, res) {
  const query = "Bangkok";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      res.render("index", {
        weatherDescription: weatherDescription,
        query: query,
        temp: temp,
      });
    });
  });
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);
    if (response.statusCode === 404 || response.statusCode === 400) {
      res.render("error", {
        query: query,
      });
    } else {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        res.render("index", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
        });
      });
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully.");
});
