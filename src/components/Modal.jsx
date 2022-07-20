import React, { Component } from 'react';
import style from './Gallery.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('Сomponent Modal');

    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    console.log('Сomponent Modal delete');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('escape');
      this.props.toggleModal();
    }
  };

  handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div>
        <div className={style.overlay} onClick={this.handleClickOverlay}>
          <div className={style.modal}>{this.props.children}</div>
        </div>
      </div>,
      modalRoot
    );
  }
}
