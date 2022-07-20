import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Circles } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './Gallery.module.css';

import { ImageGallery } from 'components/ImageGallery';
import { ButtonLoadMore } from 'components/ButtonLoadMore';
import { Modal } from 'components/Modal';
import axios from 'axios';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    imgCard: [],
    onLoading: false,
    query: '',
    page: 1,
    showModal: false,
    bigImg: '',
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchItems();
    }
  };

  setBigImg = img => {
    this.setState({ bigImg: img, showModal: true });
    console.log('img :>> ', img);
    this.openModal();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log('this.state.page :>> ', this.state.page);
  };

  handleChange = e => {
    if (e.target.value !== this.state.query) {
      this.setState({ query: e.target.value.toLowerCase() });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const elForm = e.target.elements.query.value;
    if (
      this.state.query !== elForm &&
      e.target.elements.query.value.trim() !== ''
    ) {
      this.setState({
        page: 1,
        query: elForm,
        imgCard: [],
      });
      e.target.reset();
      return;
    }

    if (e.target.elements.query.value.trim() === '') {
      toast('Введите запрос!');
      return;
    }
  };

  fetchItems = async () => {
    this.setState({ onLoading: true });

    const myKey = '27696674-0a1668506489034d568e98c79';
    const query = this.state.query;
    const page = this.state.page;

    const response = await axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
      )

      .then(images => {
        return this.setState(prevState => ({
          imgCard: [...prevState.imgCard, ...images.data.hits],
        }));
      })
      .catch(error => new Error(error))
      .finally(() => {
        this.setState({ onLoading: false });
      });
  };
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <div className={style.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery imgCard={this.state.imgCard} setBigImg={this.setBigImg} />
        {this.state.imgCard.length > 0 && (
          <ButtonLoadMore loadMore={this.loadMore} />
        )}
        {this.state.onLoading && (
          <Circles color="#00BFFF" height={80} width={80} />
        )}
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.bigImg} alt="bigImage" />
          </Modal>
        )}

        <ToastContainer autoClose={5000} />
      </div>
    );
  }
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
