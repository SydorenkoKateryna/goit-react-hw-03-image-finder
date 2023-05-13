import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    searchImage: '',
  };

  handleSearch = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    const { searchImage } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchImage={searchImage} />
      </div>
    );
  }
}

export default App;