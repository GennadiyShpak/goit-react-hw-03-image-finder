// import propTypes from 'prop-types';

function ImageGalleryItem({ fetchArr }) {
  return fetchArr.map(img => (
    <li className="ImageGalleryItem" key={img.id}>
      <img src={img.webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  ));
}

export default ImageGalleryItem;
