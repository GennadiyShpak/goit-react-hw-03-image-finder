import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import ZoomPicture from './ZoomPicture';

const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;
class App extends Component {
  state = {
    pictureInfo: '',
    fetchResponce: null,
    currentPage: 1,
    showModal: false,
    datasetUrl: '',
    loading: false,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    const { pictureInfo } = this.state;
    const prevFetch = prevState.pictureInfo;
    if (prevFetch !== pictureInfo) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { pictureInfo, currentPage } = this.state;
    this.setState({ loading: true });
    const res = await fetch(
      `${URL}&&key=${API_KEY}&q=${pictureInfo}&page=${currentPage}`,
    );
    const data = await res.json();
    if (data.hits.length === 0) {
      this.setState({ error: true });
    }
    this.setState(({ fetchResponce, currentPage }) => ({
      fetchResponce: [...fetchResponce, ...data.hits],
      currentPage: currentPage + 1,
      loading: false,
    }));

    this.scrollToNextPage();
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  modalImgHandler = ({ target }) => {
    const { url } = target.dataset;
    this.setState({ datasetUrl: url });
  };

  handleSearchValue = data => {
    const { pictureInfo } = this.state;
    if (pictureInfo === data) {
      return;
    } else {
      this.setState({
        pictureInfo: data,
        fetchResponce: [],
        currentPage: 1,
        loading: true,
      });
    }
  };

  scrollToNextPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      fetchResponce,
      showModal,
      datasetUrl,
      loading,
      error,
      pictureInfo,
    } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSearchValue} />
        {error && (
          <h1>
            По вашему запросу <span className="error">"{pictureInfo}"</span>{' '}
            ничего не найденно, введите корректный запрос
          </h1>
        )}
        {loading && (
          <Loader type="Audio" color="#00BFFF" height={80} width={80} />
        )}
        <ImageGallery
          showModal={this.togleModal}
          fetchArr={fetchResponce}
          onClick={this.modalImgHandler}
        />
        {fetchResponce && !error && <Button onClick={this.fetchImages} />}
        {showModal && (
          <Modal onClose={this.togleModal}>
            <ZoomPicture imageSrc={datasetUrl} />
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }
}

export default App;
