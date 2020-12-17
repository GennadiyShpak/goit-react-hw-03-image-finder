import { Component } from 'react';
import { toast } from 'react-toastify';

const INITIAL_VALUE = {
  value: '',
};

class SearchBar extends Component {
  state = {
    value: '',
  };

  onImputChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  onClickSubmiit = e => {
    e.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      return toast.error('Wrong request !');
    }
    this.props.onSubmit(value);
    this.reset();
  };
  reset = () => {
    this.setState({ ...INITIAL_VALUE });
  };
  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onClickSubmiit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              placeholder="Search images and photos"
              onChange={this.onImputChange}
              value={this.state.value}
            />
          </form>
        </header>
      </>
    );
  }
}

export default SearchBar;
