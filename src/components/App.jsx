import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './Gallery.module.css';

import { ImageGallery } from 'components/ImageGallery';
import { ButtonLoadMore } from 'components/ButtonLoadMore';
import { Modal } from 'components/Modal';
import { getImages } from '../getImages';

import PropTypes from 'prop-types';

export function App() {
  const [imgCard, setImgCard] = useState([]);
  const [onLoading, setOnLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setMyBigImg] = useState('');

  useEffect(() => {
    fetchItems(page, query);
  }, [page, query]);

  const setBigImg = img => {
    setMyBigImg(img);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const elForm = e.target.elements.query.value;
    if (query !== elForm && e.target.elements.query.value.trim() !== '') {
      setPage(1);
      setQuery(elForm);
      setImgCard([]);

      e.target.reset();
      return;
    }

    if (e.target.elements.query.value.trim() === '') {
      toast('Введите запрос!');
      return;
    }
  };

  const fetchItems = async (newPage, newQuery) => {
    setOnLoading(true);
    getImages(newQuery, newPage)
      .then(images => {
        return setImgCard(prevState => [...prevState, ...images]);
      })
      .catch(error => new Error(error))
      .finally(() => {
        setOnLoading(false);
      });
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <div className={style.app}>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery imgCard={imgCard} setBigImg={setBigImg} />
      {imgCard.length > 0 && <ButtonLoadMore loadMore={loadMore} />}
      {onLoading && <Circles color="#00BFFF" height={80} width={80} />}
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={bigImg} alt="bigImage" />
        </Modal>
      )}

      <ToastContainer autoClose={5000} />
    </div>
  );
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};

ImageGallery.propTypes = {
  imgCard: PropTypes.array,
  setBigImg: PropTypes.func,
};

ButtonLoadMore.propTypes = {
  loadMore: PropTypes.func,
};
Modal.propTypes = {
  toggleModal: PropTypes.func,
};
