import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';

const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;
class App extends Component {
  state = {
    pictureInfo: '',
    fetchResponce: [],
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { pictureInfo } = this.state;
    const prevFetch = prevState.pictureInfo;
    if (prevFetch !== pictureInfo) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { pictureInfo, currentPage } = this.state;
    const res = await fetch(
      `${URL}&&key=${API_KEY}&q=${pictureInfo}&page=${currentPage}`,
    );
    const data = await res.json();
    this.setState(({ fetchResponce }) => ({
      fetchResponce: [...fetchResponce, ...data.hits],
      currentPage: currentPage + 1,
    }));
  };

  handleSearchValue = data => {
    this.setState({ pictureInfo: data, fetchResponce: [], currentPage: 1 });
  };

  render() {
    const { fetchResponce } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchValue} />
        <ImageGallery fetchArr={fetchResponce} />
        <Button onClick={this.fetchImages} />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
