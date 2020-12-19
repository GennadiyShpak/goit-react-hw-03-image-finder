import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;
class App extends Component {
  state = {
    pictureInfo: '',
    fetchResponce: [],
    currentPage: 1,
  };

  async componentDidUpdate(prevState) {
    const { pictureInfo, currentPage } = this.state;
    const prevFetch = prevState.pictureInfo;
    if (prevFetch !== pictureInfo) {
      const res = await fetch(
        `${URL}&&key=${API_KEY}&q=${pictureInfo}&page=${currentPage}`,
      );
      const fetchInfo = await res.json();
      this.setState(prevState => ({
        fetchResponce: [...prevState.fetchResponce, ...fetchInfo.hits],
      }));
    }
  }
  handleSearchValue = data => {
    this.setState({ pictureInfo: data });
  };
  render() {
    const { pictureInfo, fetchResponce } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchValue} />

        <ImageGallery pictureInfo={pictureInfo} fetchArr={fetchResponce} />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
