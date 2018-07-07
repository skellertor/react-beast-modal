import React from "react";
import PropTypes from 'prop-types';

import Modal from "./Modal";
import "./styles.css";

export class ModalProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      modalChildren: [],
      backdropStyle: {},
      closeOnBackdropClick: false
    };
    this.toggleBeastModal = this.toggleBeastModal.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }
  getChildContext() {
    return {
      toggleBeastModal: this.toggleBeastModal
    };
  }
  onBackdropClick() {
    this.setState({ isVisible: false });
  }
  toggleBeastModal({ isVisible, modalChildren, backdropStyle, closeOnBackdropClick }) {
    this.setState(() => ({
      isVisible,
      modalChildren,
      backdropStyle,
      closeOnBackdropClick
    }));
  };
  render() {
    const { isVisible, modalChildren, backdropStyle, closeOnBackdropClick } = this.state;
    return (
      <div>
        <Modal
          isVisible={isVisible}
          modalChildren={modalChildren}
          backdropStyle={backdropStyle}
          onBackdropClick={closeOnBackdropClick ? this.onBackdropClick: () => {}}
        />
        {this.props.children}
      </div>
    );
  }
}

ModalProvider.childContextTypes = {
  toggleBeastModal: PropTypes.func
};

export function withModal(Component) {
  class GetContext extends React.Component {
    render() {
      return <Component { ...this.props } { ...this.context } />
    }
  }

  GetContext.contextTypes = {
    toggleBeastModal: PropTypes.func
  };

  return GetContext;
}