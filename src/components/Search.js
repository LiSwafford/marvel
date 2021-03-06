import React, { Component } from "react";
import IsLoading from "./IsLoading/IsLoading";
import { debounce } from "lodash";
import { connect } from "react-redux";
import CharCard from "./CharCard";
import { getChars } from "../ducks/reducer";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  debounceSearch = debounce(() => {
    this.props.getChars(this.state.searchTerm);
  }, 500);

  handleSearch = e => {
    this.setState(
      {
        searchTerm: e.target.value
      },
      () => {
        this.debounceSearch();
      }
    );
  };
  render() {
    const cards = this.props.characters.map(char => {
      return <CharCard key={char.id} char={char} />;
    });
    return (
      <div>
        <input
          type="text"
          placeholder="Search by name ..."
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        {this.props.loading ? (
          <IsLoading />
        ) : (
          <div className="cards-list">{cards}</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { getChars }
)(Search);
