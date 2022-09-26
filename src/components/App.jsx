import { Component } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";
import {finderInstance} from '../api/client';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal'

class App extends Component {
  state = {
    images: [],
    searchInput: "",
    page: 1,
    isLoading: false,
    currentImage: null,
    currentDesc: null,
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await finderInstance.get(`?q=${this.state.searchInput}&page=1&key=26547468-c672cf1e6b76e928b73769e65&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState({images: response.data.hits});
    } catch(error) {
      console.log(error);
    }
  };

  handleChangeInput = (ev) => {
    ev.preventDefault();
    this.setState({ searchInput: ev.target.value });
  };

  loadMore = async () => {
    await this.setState({
      isLoading: true,
      page: this.state.page + 1
    });
    try{
      const response = await finderInstance.get(`?q=${this.state.searchInput}&page=${this.state.page}&key=26547468-c672cf1e6b76e928b73769e65&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits]
      }));
    }catch(error){
      console.log(error);
    }finally{
      this.setState({isLoading: false});
    }
  }

  setCurrentImage = (ev) =>{
    this.setState({
      currentImage: ev.target.src,
      currentDesc: ev.target.alt,
    });
  }

  closeModalByESC = (ev) => {
    console.log(ev.key);
    if(ev.key === "Escape"){
      this.setState({
        currentImage: null,
        currentDesc: null,
      });
    }
  }

  closeModalByClick = (ev) =>{
    if(ev.target !== 'img'){
      this.setState({
        currentImage: null,
        currentDesc: null,
      });
    }
  }

  render(){
    return (
      <div
        className='App'
        onKeyDown={this.closeModalByESC}
        tabIndex="-1"
      >
        <SearchBar
          onSubmit={this.handleSubmit}
          searchInput={this.state.searchInput}
          handleChangeInput={this.handleChangeInput}
        />
        <ImageGallery setCurrentImage={this.setCurrentImage}>
          {this.state.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                imageSrc={image.webformatURL}
                imageAlt={image.tags}
              />
            );
          })}
        </ImageGallery>
        {this.state.isLoading && <Loader/>}
        <Button
          loadMore={this.loadMore}
          isLoading={this.state.isLoading}
          images={this.state.images}
        />
        {this.state.currentImage &&
          <Modal
            image={this.state.currentImage}
            imageDesc={this.state.currentDesc}
            closeModalByClick={this.closeModalByClick}
          />
        }
      </div>
    );
  }
}

export default App;