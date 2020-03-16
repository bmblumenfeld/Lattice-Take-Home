import React from "react";
import { connect } from "react-redux";
import { MOVIE_DB_RESOURCE_BASE_URL, COLORS, displayTypes } from "../constants";
import empty from "../images/empty.jpg";

const POOR_RATING_THRESHOLD = 60;
const RATE_TOTAL = 10;

const MovieDetailView = props => {
  const { selectedMovie } = props;
  if (!selectedMovie) return null;

  const renderMovieImage = posterPath => {
    const posterSource = `${MOVIE_DB_RESOURCE_BASE_URL}${posterPath}`;
    const alt = <img style={styles.image} alt={"...empty"} src={empty}></img>;
    return selectedMovie.poster_path ? (
      <img alt={alt} style={styles.image} src={posterSource}></img>
    ) : (
      alt
    );
  };

  const renderRating = voteAverage => {
    const voteAveragePercent = Math.floor((voteAverage / RATE_TOTAL) * 100);
    const ratingColor =
      voteAveragePercent < POOR_RATING_THRESHOLD
        ? COLORS.red100
        : COLORS.green100;
    return (
      <div style={styles.ratingContainer}>
        <div style={styles.rating}>Average Rating:</div>
        <div style={{ ...styles.rating, backgroundColor: ratingColor }}>
          {`${voteAveragePercent}%`}
        </div>
      </div>
    );
  };

  const renderOverview = overview => {
    return <div style={styles.overview}>{overview}</div>;
  };

  return (
    <div style={styles.movieContainer}>
      <h2 style={styles.title}>{selectedMovie.title}</h2>
      {renderMovieImage(selectedMovie.poster_path)}
      {renderRating(selectedMovie.vote_average)}
      {renderOverview(selectedMovie.overview)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedMovie: state.selectedMovie
  };
};

const styles = {
  movieContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "350px",
    width: "60%",
    margin: "20px",
    marginRight: "0px"
  },
  image: {
    height: "200px",
    width: "200px",
    borderRadius: "10%",
    margin: "10px",
    marginBottom: "0px"
  },
  title: {
    fontFamily: "Space Mono",
    fontSize: "15px",
    alignSelf: "center",
    margin: "0px"
  },
  ratingContainer: {
    fontFamily: "Space Mono",
    fontSize: "12px",
    margin: "10px"
  },
  rating: {
    display: "inline",
    borderRadius: "5px"
  },
  overview: {
    fontFamily: "Space Mono",
    fontSize: "12px",
    margin: "5px",
    maxHeight: "200px",
    overflow: "auto",
    alignSelf: "center"
  }
};

export default connect(mapStateToProps)(MovieDetailView);
