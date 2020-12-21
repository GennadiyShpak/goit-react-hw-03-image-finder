function ImageGalleryItem({ fetchArr, showModal, onClick }) {
  return fetchArr.map(img => (
    <li className="ImageGalleryItem" key={img.id} onClick={showModal}>
      <img
        data-url={img.largeImageURL}
        src={img.webformatURL}
        alt={img.tags}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  ));
}

export default ImageGalleryItem;
