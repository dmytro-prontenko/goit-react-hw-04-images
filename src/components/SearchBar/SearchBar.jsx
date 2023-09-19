import React from 'react';
import { StyledForm, StyledHeader, StyledInput } from './SearchBar.Styled';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  state = {
    currentQuery: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuery(this.state.currentQuery);

    this.setState({ currentQuery: '' });
  };

  render() {
    return (
      <>
        <StyledHeader className="search-bar">
          <StyledForm className="form" onSubmit={this.handleSubmit}>
            <Button />
            <StyledInput
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              name="currentQuery"
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
              value={this.state.currentQuery}
            />
          </StyledForm>
        </StyledHeader>
      </>
    );
  }
}

SearchBar.propTypes = {
  setQuery: PropTypes.func,
  getImages: PropTypes.func,
  data: PropTypes.shape({
      currentImg: PropTypes.string,
      isOpen: PropTypes.bool,
      items: PropTypes.array,
      loading: PropTypes.bool,
      page: PropTypes.number,
      per_page: PropTypes.number,
      q:PropTypes.string,
      totalHits:PropTypes.number,
    }),
};

export default SearchBar;
