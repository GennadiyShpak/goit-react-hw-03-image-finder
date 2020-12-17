import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';

const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;

class ImageGallery extends Component {
  state = {
    pictureInfo: null,
  };

  async componentDidUpdate(prevProps) {
    const prevPicture = prevProps.pictureInfo;
    const currentPicture = this.props.pictureInfo;
    if (prevPicture !== currentPicture) {
      const res = await fetch(`${URL}&&key=${API_KEY}&q=${currentPicture}`);
      const pictureInfo = await res.json();
      await this.setState({ pictureInfo: pictureInfo.hits });
    }
  }

  render() {
    const { pictureInfo } = this.state;
    // console.log(ImageGalleryItem);
    return (
      <ul className="ImageGallery ">
        {pictureInfo && <ImageGalleryItem fetchArr={pictureInfo} />}
      </ul>
    );
  }
}

export default ImageGallery;
