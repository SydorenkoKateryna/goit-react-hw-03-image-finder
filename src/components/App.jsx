import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <ToastContainer autoClose={3000} position="bottom-right" />
      </div>
    );
  }
}

export default App;
