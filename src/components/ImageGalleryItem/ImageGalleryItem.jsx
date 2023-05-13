import { Component } from 'react';
import Modal from '../Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isShowModal } = this.state;

    return (
      <li className={css['gallery-item']}>
        <img
          className={css['gallery-img']}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />

        {isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
