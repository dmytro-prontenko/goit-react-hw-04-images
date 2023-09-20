import React, { useState } from 'react';
import { StyledForm, StyledHeader, StyledInput } from './SearchBar.Styled';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';

const SearchBar = ({setQuery}) => {

  const [currentQuery, setCurrentQuery] = useState("")

  const handleInputChange = e => {
    switch (e.target.name) {
      case "currentQuery":
        setCurrentQuery(e.target.value.trim())
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setQuery(currentQuery);

    setCurrentQuery("")
  };

    return (
      <>
        <StyledHeader className="search-bar">
          <StyledForm className="form" onSubmit={handleSubmit}>
            <Button />
            <StyledInput
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              name="currentQuery"
              placeholder="Search images and photos"
              onChange={handleInputChange}
              value={currentQuery}
            />
          </StyledForm>
        </StyledHeader>
      </>
    );

}

SearchBar.propTypes = {
  setQuery: PropTypes.func,
  // getImages: PropTypes.func,
  // data: PropTypes.shape({
  //     currentImg: PropTypes.string,
  //     isOpen: PropTypes.bool,
  //     items: PropTypes.array,
  //     loading: PropTypes.bool,
  //     page: PropTypes.number,
  //     per_page: PropTypes.number,
  //     q:PropTypes.string,
  //     totalHits:PropTypes.number,
  //   }),
};

export default SearchBar;
