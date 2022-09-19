import { Component } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import {finderInstance} from '../api/client';

class App extends Component {
  state = {
    images: null,
    searchInput: "",
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

  render(){
    console.log(this.state.searchInput);
    return (
      <>
        <SearchBar
          onSubmit={this.handleSubmit}
          searchInput={this.state.searchInput}
          handleChangeInput={this.handleChangeInput}
        />
        {/* <ImageGallery /> */}
      </>
    );
  }
}

export default App;