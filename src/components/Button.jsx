import PropTypes from 'prop-types';

const Button = ({loadMore, isLoading, images}) => {
    if(images.length > 0 && !isLoading){
        return (
            <button onClick={loadMore} className='Button'>
                Load more
            </button>
        );
    }
    return;
}

Button.propTypes = {
    loadMore: PropTypes.func,
    isLoading: PropTypes.bool,
    images: PropTypes.array
}

export default Button;