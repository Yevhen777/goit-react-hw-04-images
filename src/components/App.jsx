import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from 'components/ImageGallery';
// import { ImageGalleryItem } from 'components/ImageGalleryItem';
// import { Button } from 'components/Button';
// import { Loader } from 'components/ Loader';
// import { Modal } from 'components/ Modal';

import axios from 'axios';
// import PropTypes from 'prop-types';
// import style from './ContactForm.module.css';

export class App extends Component {
  state = {
    imgCard: [],
    onLoading: false,
    query: '',
    page: 1,
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchItems();
    }
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

  fetchItems = () => {
    this.setState({ onLoading: true });

    const myKey = '27696674-0a1668506489034d568e98c79';
    const query = this.state.query;

    const response = axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=1&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(images => {
        return this.setState({ imgCard: images.data.hits, page: 1 });
      })
      .finally(() => {
        this.setState({ onLoading: false });
      });
  };

  render() {
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery imgCard={this.state.imgCard} />
        {/* <ImageGalleryItem imgCard={this.state.imgCard} /> */}
        {/* {this.state.imgCard && <div> {this.state.imgCard}</div>} */}
        {this.state.onLoading && <h1>Загружаем...</h1>}
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

// ContactForm.propTypes = {
//   initialValues: PropTypes.object,
//   handleSubmit: PropTypes.func,
// };

// Filter.propTypes = {
//   contact: PropTypes.array,
//
// };

// ContactList.propTypes = {
//   visibleContacts: PropTypes.array,
//   deleteContact: PropTypes.func,
// };
