
const ImageGallery = ({children, setCurrentImage}) => {
    return (
        <ul
         className="ImageGallery"
         onClick={setCurrentImage}
        >
          {children}
        </ul>
    );
}

export default ImageGallery;