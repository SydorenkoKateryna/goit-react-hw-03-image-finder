import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages from 'api/getImages';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import css from './App.module.css';

const LIMIT = 12;

class App extends Component {
  state = {
    searchImage: '',
    images: [],
    error: '',
    isLoading: false,
    page: 1,
    isLoadMoreBtnVisible: false,
  };

  handleSearch = searchImage => {
    if (searchImage !== this.state.searchImage) {
      this.setState({ searchImage, page: 1, images: [] });
    }
  };

  handleLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchImage, page } = this.state;

    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      this.setState({
        isLoading: true,
        isLoadMoreBtnVisible: false,
      });

      try {
        const response = await getImages(searchImage, page);
        const { hits, totalHits } = response.data;

        if (totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );

          this.setState({ isLoading: false });
          return;
        }

        if (prevState.searchImage !== searchImage) {
          toast.success(`Hooray! We found ${totalHits} images.`);

          this.setState({
            images: hits,
            isLoading: false,
          });

          if (totalHits > LIMIT) {
            this.setState({ isLoadMoreBtnVisible: true });
          }
        } else {
          if (page > Math.ceil(totalHits / LIMIT)) {
            toast.info(
              "We're sorry, but you've reached the end of search results."
            );

            this.setState({
              isLoading: false,
              isLoadMoreBtnVisible: false,
            });

            return;
          }

          this.setState(prevState => {
            return {
              images: [...prevState.images, ...hits],
              isLoading: false,
              isLoadMoreBtnVisible: true,
            };
          });
        }
      } catch (error) {
        error.message = "That's an error ☹️";

        this.setState({ error, isLoading: false });
      }
    }
  }

  render() {
    const { images, error, isLoading, isLoadMoreBtnVisible } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} isLoading={isLoading} />

        {error && (
          <h2 className={css.error}>
            {error.request.status}. {error.message}
          </h2>
        )}

        {images.length !== 0 && <ImageGallery images={images} />}

        {isLoading && <Loader />}

        {isLoadMoreBtnVisible && (
          <Button handleClick={() => this.handleLoadMoreBtnClick()}></Button>
        )}

        <ToastContainer autoClose={3000} position="bottom-right" />
      </div>
    );
  }
}

export default App;
