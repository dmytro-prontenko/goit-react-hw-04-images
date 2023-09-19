import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = (props) => {
  const onImageGalleryItemClick = item => {
    props.handleModal(props.item.id, props.item.largeImageURL)

  };

  return (
    <li className="gallery-item" onClick={onImageGalleryItemClick}>
      <img
        className="gallery-item-img"
        src={props.item.webformatURL}
        alt={props.item.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
  modalStatus:PropTypes.bool,
  handleModal:PropTypes.func,
};

export default ImageGalleryItem;

