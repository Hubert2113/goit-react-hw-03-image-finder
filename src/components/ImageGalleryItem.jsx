

const ImageGalleryItem = (imageSrc, imageAlt) => {
    return (
        <li className="ImageGalleryItem">
          <img src={imageSrc} alt={imageAlt} />
        </li>
    );
}

export default ImageGalleryItem;