const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const {
  getPopularMovies,
  getMoviesFromSearch,
  getTrendingMovies,
  getAllMovies
} = require("./utils.js");
const redis = require("redis");

const INTERNAL_SERVER_ERROR_STATUS = 500;
const STATUS_SUCCESS = 200;
const HOUR_EXPIRATION = 3600;
const DAY_EXPIRATION = 86400;
const MONTH_EXPIRATION = 2592000;

const app = express();

const port = process.env.PORT || 8000;

const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(redisPort);

redisClient.on("error", err => {
  console.log("Error " + err);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/all", async (req, res) => {
  const pageNumber = Number(req.query.page);
  const allRedisKey = `all:${pageNumber}`;
  res.header("Access-Control-Allow-Origin", "*");
  try {
    redisClient.get(allRedisKey, async (err, allMovies) => {
      if (err) throw err;
      if (allMovies) {
        res.status(STATUS_SUCCESS).json(JSON.parse(allMovies));
      } else {
        const allMovies = await getAllMovies(pageNumber);
        const allMovieData = { data: allMovies.results, page: allMovies.page };
        redisClient.setex(
          allRedisKey,
          DAY_EXPIRATION,
          JSON.stringify(allMovieData)
        );
        res.status(STATUS_SUCCESS).json(allMovieData);
      }
    });
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});

app.get("/popular", async (req, res) => {
  const pageNumber = Number(req.query.page);
  const popularRedisKey = `popular:${pageNumber}`;
  res.header("Access-Control-Allow-Origin", "*");
  try {
    redisClient.get(popularRedisKey, async (err, allTimePopularMovies) => {
      if (err) throw err;
      if (allTimePopularMovies) {
        res.status(STATUS_SUCCESS).json(JSON.parse(allTimePopularMovies));
      } else {
        const allTimePopularMovies = await getPopularMovies(pageNumber);
        const allTimePopularMoviesData = {
          data: allTimePopularMovies.results,
          page: allTimePopularMovies.page
        };
        redisClient.setex(
          popularRedisKey,
          MONTH_EXPIRATION,
          JSON.stringify(allTimePopularMoviesData)
        );
        res.status(STATUS_SUCCESS).json(allTimePopularMoviesData);
      }
    });
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});

app.get("/search", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const searchTerm = req.query.searchTerm;
  const pageNumber = Number(req.query.page);
  const searchRedisKey = `search:${searchTerm}:${pageNumber}`;
  try {
    redisClient.get(searchRedisKey, async (err, searchResults) => {
      if (err) throw err;
      if (searchResults) {
        res.status(STATUS_SUCCESS).json(JSON.parse(searchResults));
      } else {
        const searchResults = await getMoviesFromSearch(searchTerm, pageNumber);
        const searchResultsData = {
          data: searchResults.results,
          page: searchResults.page
        };
        redisClient.setex(
          searchRedisKey,
          MONTH_EXPIRATION,
          JSON.stringify(searchResultsData)
        );
        res.status(STATUS_SUCCESS).json(searchResultsData);
      }
    });
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});

app.get("/trending", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const trendingRedisKey = `/trending`;
  try {
    redisClient.get(trendingRedisKey, async (err, trendingMovies) => {
      if (err) throw err;
      if (trendingMovies) {
        res.status(STATUS_SUCCESS).json(JSON.parse(trendingMovies));
      } else {
        const trendingMovies = await getTrendingMovies();
        const trendingMoviesData = {
          data: trendingMovies.results,
          page: trendingMovies.page
        };
        redisClient.setex(
          trendingRedisKey,
          HOUR_EXPIRATION,
          JSON.stringify(trendingMoviesData)
        );
        res.status(STATUS_SUCCESS).json(trendingMoviesData);
      }
    });
  } catch (error) {
    res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
    throw error;
  }
});
