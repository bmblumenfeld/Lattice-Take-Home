import React from "react";
import { fetchSearchMovies, selectDisplayType, setSearch } from "../actions";
import { connect } from "react-redux";
import { displayTypes, COLORS } from "../constants";

const SearchBar = props => {
  const { fetchSearchMovies, selectDisplayType, setSearch, searchTerm } = props;

  const isValid = () => {
    if (searchTerm.length) return true;
    return false;
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSearch = e => {
    if (isValid()) {
      selectDisplayType(displayTypes.search);
      fetchSearchMovies(searchTerm);
    }
    e.preventDefault();
  };

  const buttonBackgroundColor = isValid() ? COLORS.blue100 : COLORS.white;

  return (
    <form style={styles.inputContainer} onSubmit={handleSearch}>
      <button
        type={"submit"}
        style={{
          ...styles.submitButton,
          backgroundColor: buttonBackgroundColor
        }}
      >
        Search
      </button>
      <input
        style={styles.textInput}
        type={"text"}
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for any movie"
      ></input>
    </form>
  );
};

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "350px",
    alignSelf: "center",
    height: "30px",
    margin: "10px"
  },
  textInput: {
    width: "100%",
    outline: "none",
    borderRadius: "5px",
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    fontFamily: "Space Mono",
    fontSize: "15px"
  },
  submitButton: {
    height: "100%",
    fontFamily: "Space Mono",
    outline: "none",
    fontSize: "15px",
    borderRadius: "5px",
    border: "1px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    cursor: "pointer"
  }
};

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps, {
  fetchSearchMovies,
  selectDisplayType,
  setSearch
})(SearchBar);
