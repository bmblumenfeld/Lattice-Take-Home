import React from "react";
import { connect } from "react-redux";
import {
  selectDisplayType,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchAllMovies
} from "../actions";
import { COLORS, displayTypes } from "../constants";

const DisplayToggles = props => {
  const toggleTypes = [
    displayTypes.trending,
    displayTypes.allTime,
    displayTypes.all
  ];

  const setDisplay = e => {
    const displayType = e.target.textContent;
    props.selectDisplayType(displayType);
    const { fetchTrendingMovies, fetchPopularMovies, fetchAllMovies } = props;
    switch (displayType) {
      case displayTypes.all:
        fetchAllMovies();
        break;
      case displayTypes.trending:
        fetchTrendingMovies();
        break;
      case displayTypes.allTime:
        fetchPopularMovies();
        break;
      case displayTypes.search:
        return;
      default:
        fetchPopularMovies();
    }
  };

  return (
    <div style={styles.toggleContainer}>
      {toggleTypes.map(typeName => {
        const backgroundColor =
          typeName === props.displayType ? COLORS.green100 : COLORS.white;

        return (
          <div
            onClick={setDisplay}
            style={{ ...styles.toggle, backgroundColor: backgroundColor }}
            key={Math.random() + typeName}
          >
            <div>{typeName}</div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    displayType: state.displayType
  };
};

const styles = {
  toggleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "400px"
  },
  toggle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    width: "120px",
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    fontFamily: "Space Mono",
    fontSize: "13px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default connect(mapStateToProps, {
  selectDisplayType,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchAllMovies
})(DisplayToggles);
