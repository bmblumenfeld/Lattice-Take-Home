# Lattice Take Home Exercise

First off, thank you for taking the time to interview with the Lattice team. We know your creativity and time are valuable and we're excited you are willing to share some of it with us.

## Project

We would like you to build a small web app for finding information about all of your favorite movies using the [The Movie Database API](https://developers.themoviedb.org/3/getting-started).

## Minimum Feature Set

1. When first loaded, the user should see a list of the most [popular movies](https://developers.themoviedb.org/3/movies/get-popular-movies) and a search bar.
2. A user should be able to [search](https://developers.themoviedb.org/3/search/search-movies) for a movie by title in the search bar, and the matching results should show up in the list of movies.
3. A user can click on a [movie](https://developers.themoviedb.org/3/movies) in the list and be taken to a page that displays more details for the movie (title, movie poster, release date, cast, synopsis, etc)

## Technical Requirements

1. Using Node.js, create a backend application that accepts requests to power the features above. This app should query the Movie DB API and return the results to the user.
2. Compose your UI using React or Vue.
3. Please include a README.md with step-by-step instructions for running the app. Be careful to ensure there are not local dependencies that have been overlooked in the readme.

## Extra Points (optional)

1. Add more features that you think are cool! Some ideas:
   - Add filtering by genre
   - Show related movies
   - Add a page for individual actor details
2. Add a caching layer for your requests to the 3rd party API.
3. This not a design exercise, but UX polish that demonstrates your mastery of your frontend tool set is encouraged.
4. Add unit testing for your API.

## Submission

When you are satisfied with your app and ready to submit it to the team, send a link to the Github repo to the Lattice employee you have been working through the interview process with.
