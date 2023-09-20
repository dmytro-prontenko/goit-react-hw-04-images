import React, { useEffect, useRef, useState } from 'react';
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

  const refQ = useRef("")
  const refPage = useRef("")

  const setQuery = q => {
    setItems([]);
    setQ(q);
    setPage(1);
    refQ.current(q);
    refPage.current(page)
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleModalOpen = (id, img) => {
    setIsOpen(prev => !prev.isOpen);
    setCurrentImg(img);
    setCurrentImgId(id);
  };

  useEffect(() => {
    console.log(q.length);
    if ( refQ.current !== q || refPage.current !== page) {
      setLoading(true);
      async function fetchData() {
        const { hits, totalHits } = await getData({
          q,
          page,
          perPage,
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
          <img src={currentImg} alt="" />
        </Modal>
      )}
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     items: [],
//     loading: false,
//     q: '',
//     page: 1,
//     perPage: 12,
//     totalHits: null,
//     isOpen: false,
//     currentImg: '',
//     currentImgId: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
// const { page, q, perPage } = this.state;
// if (prevState.page !== page || prevState.q !== q) {
//   try {
//     this.setState({ loading: true });
//     const { hits, totalHits } = await getData({
//       q,
//       page,
//       perPage,
//     });

//     this.setState(prevState => ({
//       items: [...prevState.items, ...hits],
//       totalHits,
//     }));
// if (!totalHits)
//   throw new Error('Nothing found. Please, try another query');
// toast.success(
//   `Shown ${
//     perPage * page <= totalHits ? perPage * page : totalHits
//   } images from ${totalHits}`,
//   {
//     position: 'top-right',
//     autoClose: 1000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     theme: 'colored',
//   }
// );
//   } catch (error) {
//     toast.error(`${error.message}`, {
//       position: 'top-right',
//       autoClose: 1000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       theme: 'colored',
//     });
//   } finally {
//     this.setState({ loading: false });
//   }
// }
//   }

// setQuery = q => {
//   this.setState({ q, page: 1, items: [] });
// };

// handleLoadMore = () => {
//   this.setState(prev => ({ page: prev.page + 1 }));
// };

// handleModalOpen = (id, img) => {
//   this.setState(prev => ({
//     isOpen: !prev.isOpen,
//     currentImg: img,
//     currentImgId: id,
//   }));
// };

//   render() {
// const { isOpen, totalHits, loading, items, currentImg } = this.state;
// return (
//   <>
//     <SearchBar
//       setQuery={this.setQuery}
//       getImages={this.handleFetchImages}
//       data={this.state}
//     />
//     {loading && !items.length && <Loader />}
//     {items.length ? (
//       <>

//         <ImageGallery
//           imagesToView={items}
//           modalStatus={isOpen}
//           handleModal={this.handleModalOpen}
//         />
//         {items.length < totalHits && (
//           <StyledLoadMore type="button" onClick={this.handleLoadMore}>
//             {loading ? 'Loading...' : 'Load more'}
//           </StyledLoadMore>
//         )}
//       </>
//     ) : null}
//     {isOpen && (
//       <Modal onCloseModal={this.handleModalOpen}>
//         <img src={currentImg} alt="" />
//       </Modal>
//     )}
//   </>
// );
// }
// }
