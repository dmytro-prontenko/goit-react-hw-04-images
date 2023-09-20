import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { getData } from 'services/imgAPI';
import { toast } from 'react-toastify';
import { StyledLoadMore } from './LoadMoreButton/LoadMoreButton.Styled';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [totalHits, setTotalHits] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [currentImgId, setCurrentImgId] = useState('');

  const setQuery = q => {
    setItems([]);
    setQ(q);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleModalOpen = (id, img) => {
    setIsOpen(!isOpen);
    setCurrentImg(img)
    setCurrentImgId(id)
  };

  useEffect(() => {
    console.log(q.length);
    if (q) {
      async function fetchData() {
        setLoading(true);
        try {
          const { hits, totalHits } = await getData({
            q,
            page,
            per_page: perPage,
          });

          setItems(prev => [...prev, ...hits]);
          setTotalHits(totalHits);

          if (!totalHits)
            throw new Error('Nothing found. Please, try another query');
          toast.success(
            `Shown ${
              perPage * page <= totalHits ? perPage * page : totalHits
            } images from ${totalHits}`,
            {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: 'colored',
            }
          );
        } catch {
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [q, page, perPage]);

  return (
    <>
      <SearchBar setQuery={setQuery} />
      {loading && !items.length && <Loader />}
      {items.length ? (
        <>
          <ImageGallery
            imagesToView={items}
            modalStatus={isOpen}
            handleModal={handleModalOpen}
          />
          {items.length < totalHits && (
            <StyledLoadMore type="button" onClick={handleLoadMore}>
              {loading ? 'Loading...' : 'Load more'}
            </StyledLoadMore>
          )}
        </>
      ) : null}
      {isOpen && (
        <Modal onCloseModal={handleModalOpen}>
          <img src={currentImg} alt={currentImgId} />
        </Modal>
      )}
    </>
  );
};

export default App;
