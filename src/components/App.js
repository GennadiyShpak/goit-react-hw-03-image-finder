import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    pictureInfo: '',
  };

  handleSearchValue = data => {
    this.setState({ pictureInfo: data });
  };
  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSearchValue} />

        <ImageGallery pictureInfo={this.state.pictureInfo} />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
