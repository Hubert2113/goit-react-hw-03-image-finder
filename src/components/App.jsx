import { useState } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";
import {finderInstance} from '../api/client';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal'

const App = () => {

  let [images, setImages] = useState([]);
  let [searchInput, setSearchInput] = useState('');
  let [page, setPage] = useState(1);
  let [isLoading, setLoading] = useState(false);
  let [currentImage, setCurrentImage] = useState(null);
  let [currentDesc, setCurrentDesc] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await finderInstance.get(`?q=${searchInput}&page=1&key=26547468-c672cf1e6b76e928b73769e65&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(response.data.hits);
    } catch(error) {
      console.log(error);
    }
  };

  const handleChangeInput = (ev) => {
    ev.preventDefault();
    setSearchInput(ev.target.value);
  };

  const loadMore = async () => {
    await (() => {
      setLoading(true);
      setPage(page += 1);
    })();
    try{
      const response = await finderInstance.get(`?q=${searchInput}&page=${page}&key=26547468-c672cf1e6b76e928b73769e65&image_type=photo&orientation=horizontal&per_page=12`);
      setImages([...images, ...response.data.hits]);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const setCurrentImageModal = (ev) =>{
    setCurrentImage(ev.target.src);
    setCurrentDesc(ev.target.alt);
  }

  const closeModalByESC = (ev) => {
    if(ev.key === "Escape"){
      setCurrentImage(null);
      setCurrentDesc(null);
    }
  }

  const closeModalByClick = (ev) =>{
    if(ev.target !== 'img'){
      setCurrentImage(null);
      setCurrentDesc(null);
    }
  }

  return (
    <div
      className='App'
      onKeyDown={closeModalByESC}
      tabIndex="-1"
    >
      <SearchBar
        onSubmit={handleSubmit}
        searchInput={searchInput}
        handleChangeInput={handleChangeInput}
      />
      <ImageGallery setCurrentImage={setCurrentImageModal}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageSrc={image.webformatURL}
              imageAlt={image.tags}
            />
          );
        })}
      </ImageGallery>
      {isLoading && <Loader/>}
      <Button
        loadMore={loadMore}
        isLoading={isLoading}
        images={images}
      />
      {currentImage &&
        <Modal
          image={currentImage}
          imageDesc={currentDesc}
          closeModalByClick={closeModalByClick}
        />
      }
    </div>
  );
}

export default App;