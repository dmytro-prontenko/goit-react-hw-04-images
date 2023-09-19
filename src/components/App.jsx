import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { getData } from 'services/imgAPI';
import { toast } from 'react-toastify';
import { StyledLoadMore } from './LoadMoreButton/LoadMoreButton.Styled';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

class App extends Component {
  state = {
    items: [],
    loading: false,
    q: '',
    page: 1,
    per_page: 12,
    totalHits: null,
    isOpen: false,
    currentImg: '',
    currentImgId: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, q, per_page } = this.state;
    if (prevState.page !== page || prevState.q !== q) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits } = await getData({
          q,
          page,
          per_page,
        });

        this.setState(prevState => ({
          items: [...prevState.items, ...hits],
          totalHits,
        }));
        if (!totalHits)
          throw new Error('Nothing found. Please, try another query');
        toast.success(
          `Shown ${
            per_page * page <= totalHits ? per_page * page : totalHits
          } images from ${totalHits}`,
          {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'colored',
          }
        );
      } catch (error) {
        toast.error(`${error.message}`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'colored',
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  setQuery = q => {
    this.setState({ q, page: 1, items: [] });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleModalOpen = (id, img) => {
    this.setState(prev => ({
      isOpen: !prev.isOpen,
      currentImg: img,
      currentImgId: id,
    }));
  };

  render() {
    const { isOpen, totalHits, loading, items, currentImg } = this.state;
    return (
      <>
        <SearchBar
          setQuery={this.setQuery}
          getImages={this.handleFetchImages}
          data={this.state}
        />
        {items.length ? (
          <>
            {loading && !items.length && <Loader />}

            <ImageGallery
              imagesToView={items}
              modalStatus={isOpen}
              handleModal={this.handleModalOpen}
            />
            {items.length < totalHits && (
              <StyledLoadMore type="button" onClick={this.handleLoadMore}>
                {loading ? 'Loading...' : 'Load more'}
              </StyledLoadMore>
            )}
          </>
        ) : null}
        {isOpen && (
          <Modal onCloseModal={this.handleModalOpen}>
            <img src={currentImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
