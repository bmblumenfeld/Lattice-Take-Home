import React from "react";
import { connect } from "react-redux";
import { fetchPopularMovies } from "../actions";

class MovieList extends React.Component {
  componentDidMount() {
    this.props.fetchPopularMovies();
  }
  renderMovies(movies) {
    return movies.map(movie => <div>{movie.title}</div>);
  }

  render() {
    const { popularMovies } = this.props;
    return <div>{this.renderMovies(popularMovies)}</div>;
  }
}

const mapStateToProps = state => {
  return { popularMovies: state.popularMovies };
};

export default connect(mapStateToProps, { fetchPopularMovies })(MovieList);
