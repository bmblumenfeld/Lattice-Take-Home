import React, { useState } from "react";
import Truncate from "react-truncate";
import InfiniteScroll from "react-infinite-scroller";
import { fetchPopularMovies, fetchAllMovies, selectMovie } from "../actions";
import { connect } from "react-redux";
import { displayTypes, COLORS } from "../constants";

const MAX_TITLE_WIDTH = 300;
const RECORD_LIIMIT = 10000;

const MovieRow = props => {
  const [isHover, setHover] = useState(false);
  const { movie, selectMovie } = props;
  const backgroundColor = isHover ? COLORS.gray200 : COLORS.white;
  return (
    <div
      onClick={() => {
        selectMovie(movie);
      }}
      style={styles.rowContainer}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Truncate
        style={{ ...styles.movieName, backgroundColor: backgroundColor }}
        width={MAX_TITLE_WIDTH}
      >
        {movie.title}
      </Truncate>
    </div>
  );
};

const Loading = () => {
  return <div style={styles.loadingContainer}>...LOADING</div>;
};

const EmptySearch = () => {
  const message = "No Search Results...";
  return (
    <div style={styles.container}>
      <div style={styles.loadingContainer}>{message}</div>
    </div>
  );
};

const MovieList = props => {
  const { movies, selectMovie, displayType } = props;

  const renderMovies = movies => {
    return movies.map((movie, index) => (
      <MovieRow
        key={`${movie.id}:${index}:`}
        movie={movie}
        selectMovie={selectMovie}
      />
    ));
  };

  const loadMore = page => {
    const { fetchPopularMovies, fetchAllMovies } = props;
    switch (displayType) {
      case displayTypes.allTime:
        fetchPopularMovies(page);
        break;
      case displayTypes.trending:
        return null;
      case displayTypes.all:
        fetchAllMovies(page);
        break;
      default:
        return null;
    }
  };

  const hasMore = () => {
    if (
      displayType === displayTypes.search ||
      displayType === displayTypes.trending
    ) {
      return false;
    }
    if (movies.length < RECORD_LIIMIT) return true;
    return false;
  };

  if (!movies.length && displayType === displayTypes.search) {
    return <EmptySearch />;
  }

  return (
    <div style={styles.container}>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore()}
        useWindow={false}
        loader={<Loading />}
      >
        {renderMovies(movies)}
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    displayType: state.displayType
  };
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "350px",
    width: "40%",
    maxHeight: "350px",
    overflow: "auto",
    marginTop: "10px",
    marginRight: "10px"
  },
  rowContainer: {
    margin: "5px",
    cursor: "pointer"
  },
  movieName: {
    fontFamily: "Space Mono"
  },
  loadingContainer: {
    fontFamily: "Space Mono",
    fontSize: "20px",
    width: "100%"
  }
};

export default connect(mapStateToProps, {
  fetchPopularMovies,
  fetchAllMovies,
  selectMovie
})(MovieList);
