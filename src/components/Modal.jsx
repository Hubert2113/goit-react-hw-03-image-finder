import PropTypes from 'prop-types';

const Modal = ({image, imageDesc, closeModalByClick, closeModalByESC}) =>{
    return (
        <div
          className="Overlay"
          onClick={closeModalByClick}
          onKeyDown={closeModalByESC}
        >
          <div className="Modal">
            <img src={image} alt={imageDesc} />
          </div>
        </div>
    );
}

Modal.propTypes = {
    image: PropTypes.string,
    imageDesc: PropTypes.string
}

export default Modal;