const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { getPopularMovies, getMoviesFromSearch } = require("./utils.js");
// const cors = require("cors");

const INTERNAL_SERVER_ERROR_STATUS = 500;
const STATUS_SUCCESS = 200;

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/popular", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const allTimePopularMovies = await getPopularMovies();
    res.status(STATUS_SUCCESS).json({ data: allTimePopularMovies });
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchResults = await getMoviesFromSearch("nice");
    res.send(searchResults);
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});
