import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchImage: '',
  };

  handleSearch = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    const {searchImage} = this.state;

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchImage={searchImage}/>
      </div>
    );
  }
}

export default App;
