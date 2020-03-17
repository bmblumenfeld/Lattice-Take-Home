# Lattice Movie Viewer :movie_camera: :film_strip: :clapper:

A MVP movie-veiwing app

## Getting Started

To run this project you will need Node >= 8.10 / yarn / redis

```bash
brew install node
brew install yarn
brew install redis
```

### Spinning up Backend :rocket:

From `/backend` of the project you can then run:

```
redis-server
```

In a new terminal window you can then run

```bash
yarn install
yarn start-server
```

### Spinning up Frontend :desktop_computer:

From `/frontend` of the project you can then run:

```bash
yarn install
yarn start
```

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. (should open automatically)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Technology and considerations:

- To get this project moving I used create-react-app
- For FE state management I used Redux. For this application it is a bit unnecessary; however,
  it really sets this project up to be extended very easily!
- [Movie DB](https://developers.themoviedb.org/3/getting-started "Movie DB") Source of all movie data
- [Redis](https://redislabs.com/redis-enterprise/use-cases/caching/ "Redis") basic in-memory cache

## Assumptions:

I felt like I stuck within the guides of the specific project description; however, I made some assumptions
along the way.

- There was no clear definition of 'popular' so I went with what would be most useful to our user (in my opinion) -- currently trending movies

## Taking this project to the next level

There many things that could be improved even with the features that are currently built -- this is an MVP afterall.

- Move styling to [styled components](https://styled-components.com/ "Styled Components") There is quite a bit of styling cruft that could be made more reusable styled components.
- Routing instead of the current routing logic in redux
- Refining caching logic as our user-base scales
- Better delineation of what is trending, all time best, etc.
- All movies is almost useless, having the ability to page through all movies efficiently is necessary for users to realistically make use of the feature.
- Robust testing
- Sorting by decade would be a nice-to-have
