const fetch = require("node-fetch");
const { MOVIE_DB_API_KEY } = require("./config.js");

const popularQuery = `
https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

`;

const getRecentPopularMovies = async () => {
  fetch(popularQuery).then(response => {
    console.log(response);
  });
};

module.exports = getRecentPopularMovies;
