import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ fetchArr, showModal, onClick }) {
  return (
    <>
      {fetchArr && (
        <ul className="ImageGallery ">
          <ImageGalleryItem
            fetchArr={fetchArr}
            showModal={showModal}
            onClick={onClick}
          />
        </ul>
      )}
    </>
  );
}

export default ImageGallery;
