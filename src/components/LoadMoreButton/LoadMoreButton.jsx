import React from 'react'
import PropTypes from 'prop-types';

const LoadMoreButton = (onClick) => {
  const loadMore = () => {
    onClick()
  }
  return (
    <button type='button' onClick={loadMore}>
    </button>
  )
}

LoadMoreButton.propTypes = {
  onClick:PropTypes.func,
}


export default LoadMoreButton
