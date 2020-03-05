const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const getRecentPopularMovies = require("./utils.js");

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/popular", async (req, res) => {
  await getRecentPopularMovies();
});
