import { Component } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";

class App extends Component {
  state = {
    images: null,
    searchInput: "",
  };

  handleSubmit = () =>{
    this.setState({ images: null });
  };

  handleChangeInput = ev => {
    this.setState({ searchInput: ev.target.value });
  };

  render(){
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