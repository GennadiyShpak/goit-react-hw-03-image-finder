import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;
class App extends Component {
  state = {
    pictureInfo: '',
    fetchResponce: null,
    currentPage: 1,
    showModal: false,
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

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSearchValue = data => {
    this.setState({ pictureInfo: data, fetchResponce: [], currentPage: 1 });
  };

  render() {
    const { fetchResponce, showModal } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchValue} />
        <ImageGallery fetchArr={fetchResponce} showModal={showModal} />
        {fetchResponce && <Button onClick={this.fetchImages} />}
        {/* {showModal && <Modal />} */}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
