const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { getPopularMovies, getMoviesFromSearch } = require("./utils.js");

const INTERNAL_SERVER_ERROR_STATUS = "500";

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/popular", async (req, res) => {
  try {
    const allTimePopularMovies = await getPopularMovies();
    res.send(allTimePopularMovies);
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
