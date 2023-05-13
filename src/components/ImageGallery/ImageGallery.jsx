import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import getImages from 'api/getImages';
import ImageGalleryItem from '../ImageGalleryItem/';
import Button from '../Button';
import Loader from '../Loader';
import css from './ImageGallery.module.css';

let page = 1;
const LIMIT = 12;

class ImageGallery extends Component {
  state = {
    images: null,
    error: '',
    isLoading: false,
    totalPages: null,
    isLoadMoreBtnVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const newSearchImage = this.props.searchImage;

    if (prevProps.searchImage !== newSearchImage && newSearchImage) {
      page = 1;

      this.setState({
        images: null,
        isLoading: true,
        isLoadMoreBtnVisible: false,
      });

      try {
        const response = await getImages(newSearchImage, page);
        const { hits, totalHits } = response.data;

        if (totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );

          this.setState({ isLoading: false });
          return;
        }

        toast.success(`Hooray! We found ${totalHits} images.`);

        this.setState({
          images: hits,
          isLoading: false,
          totalPages: totalHits,
        });

        if (totalHits > LIMIT) {
          this.setState({ isLoadMoreBtnVisible: true });

          page += 1;
        }
      } catch (error) {
        error.message = "That's an error ☹️";

        this.setState({ error, isLoading: false });
      }
    }
  }

  handleLoadMoreBtnClick = async () => {
    const { totalPages } = this.state;

    this.setState({ isLoading: true });

    if (page > Math.ceil(totalPages / LIMIT)) {
      toast.info("We're sorry, but you've reached the end of search results.");

      this.setState({
        isLoading: false,
        isLoadMoreBtnVisible: false,
      });

      return;
    }

    const searchImage = this.props.searchImage;
    const response = await getImages(searchImage, page);
    const { hits } = response.data;

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...hits],
        isLoading: false,
      };
    });

    page += 1;
  };

  render() {
    const { isLoading, error, images, isLoadMoreBtnVisible } = this.state;

    return (
      <>
        {error && (
          <h2 className={css.error}>
            {error.request.status}. {error.message}
          </h2>
        )}

        {images && (
          <ul className={css.gallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  webformatURL={image.webformatURL}
                  largeImageURL={image.largeImageURL}
                  tags={image.tags}
                />
              );
            })}
          </ul>
        )}

        {isLoading && <Loader />}

        {isLoadMoreBtnVisible && (
          <Button handleClick={() => this.handleLoadMoreBtnClick()}></Button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string.isRequired,
};

export default ImageGallery;
