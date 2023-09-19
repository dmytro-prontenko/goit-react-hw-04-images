import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGallery.css';

// export default ImageGallery;

class ImageGallery extends Component {
  render() {
    const dataToInsert = this.props.imagesToView.map(item => {
      return (
        <ImageGalleryItem
          item={item}
          key={item.id}
          modalStatus={this.props.modalStatus}
          handleModal={this.props.handleModal}
        />
      );
    });
    return <ul className="gallery">{dataToInsert}</ul>;
  }
}

ImageGallery.propTypes = {
  imagesToView: PropTypes.arrayOf(PropTypes.object),
  modalStatus:PropTypes.bool,
  handleModal:PropTypes.func,
};

export default ImageGallery;
