// import propTypes from 'prop-types';

function ImageGalleryItem({ fetchArr }) {
  return fetchArr.map(img => (
    <li className="ImageGalleryItem" key={img.id}>
      <a href={img.webformatURL}>
        <img src={img.webformatURL} alt="" className="ImageGalleryItem-image" />
      </a>
    </li>
  ));
}

export default ImageGalleryItem;
