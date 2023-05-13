import { Component } from 'react';
import { toast } from 'react-toastify';
import getImages from 'api/getImages';
import ImageGalleryItem from '../ImageGalleryItem/';
import Button from '../Button';
import Loader from '../Loader';
import css from './ImageGallery.module.css';

const LIMIT = 12;

class ImageGallery extends Component {
  state = {
    images: null,
    error: '',
    isLoading: false,
    page: 1,
    totalPages: null,
    isLoadMoreBtnVisible: false,
  };

  //   async componentDidUpdate(prevProps, prevState) {
  //     const newSearchImage = this.props.searchImage.trim();

  //     if (prevProps.searchImage !== newSearchImage && newSearchImage) {
  //       this.setState({ images: null, isLoading: true });

  //       const response = await getImages(newSearchImage);

  //       const { hits, totalHits } = response.data;

  //       this.setState({ images: hits, isLoading: false });
  //     }
  //   }

  async componentDidUpdate(prevProps, prevState) {
    const newSearchImage = this.props.searchImage.trim();
    const { page } = this.state;

    console.log(page);

    if (prevProps.searchImage !== newSearchImage && newSearchImage) {
      console.log(prevProps.searchImage);
      console.log(newSearchImage);
      console.log(prevProps.searchImage !== newSearchImage);

      this.setState({
        images: null,
        isLoading: true,
        isLoadMoreBtnVisible: false,
        page: 1,
      });

      console.log(page);

      try {
        const response = await getImages(newSearchImage, page);

        const { hits, totalHits } = response.data;
        console.log(totalHits);

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

          this.setState(prevState => {
            return {
              page: prevState.page + 1,
            };
          });
        }
      } catch (error) {
        error.message = "That's an error 0_0";

        this.setState({ error, isLoading: false });
      }
    }
  }

  handleLoadMoreBtnClick = async () => {
    const { page, totalPages } = this.state;

    this.setState({ isLoading: true });

    if (page > Math.ceil(totalPages / LIMIT)) {
      toast.info("We're sorry, but you've reached the end of search results.");

      this.setState({
        isLoading: false,
        isLoadMoreBtnVisible: false,
      });

      return;
    }

    const response = await getImages(this.props.searchImage.trim(), page);

    const { hits } = response.data;

    this.setState({
      isLoading: false,
    });

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { isLoading, error, images, isLoadMoreBtnVisible } = this.state;

    return (
      <>
        {error && (
          <h2>
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

        {/* {images && totalPages > LIMIT && (
          <Button handleClick={() => this.handleLoadMoreBtnClick()}></Button>
        )} */}
        {isLoadMoreBtnVisible && (
          <Button handleClick={() => this.handleLoadMoreBtnClick()}></Button>
        )}
      </>
    );
  }
}

export default ImageGallery;
