import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ pictureInfo, fetchArr }) {
  return (
    <>
      {fetchArr && (
        <ul className="ImageGallery ">
          <ImageGalleryItem
          // fetchArr={fetchArr}
          />
        </ul>
      )}
    </>
  );
}

export default ImageGallery;
