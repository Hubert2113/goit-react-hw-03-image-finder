import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Search} from "@styled-icons/boxicons-regular/Search";

const SearchIcon = styled(Search)`
    color: #000;
`;

const SearchBar = ({onSubmit, searchInput, handleChangeInput}) => {
    return (
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={onSubmit}>
            <button type="submit" className="SearchForm-button">
                <SearchIcon />
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleChangeInput}
              value={searchInput}
            />
          </form>
        </header>
    );
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func,
    searchInput: PropTypes.string,
    handleChangeInput: PropTypes.func,
}

export default SearchBar;