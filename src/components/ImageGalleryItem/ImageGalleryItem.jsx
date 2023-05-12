const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
