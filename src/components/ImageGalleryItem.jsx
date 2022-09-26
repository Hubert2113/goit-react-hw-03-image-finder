import PropTypes from 'prop-types';

const ImageGalleryItem = ({imageSrc, imageAlt}) => {
    return (
        <li className="ImageGalleryItem">
          <img
            className="ImageGalleryItem-image"
            src={imageSrc}
            alt={imageAlt}
          />
        </li>
    );
}

ImageGalleryItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
}

export default ImageGalleryItem;