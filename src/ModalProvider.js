import React from "react";
import PropTypes from 'prop-types';

import Modal from "./Modal";
import "./styles.css";

export class ModalProvider extends React.Component {
  constructor({configuration: { backdropStyle = {}, modalContainerStyle = {}, closeOnBackdropClick = false }}) {
    super();
    this.state = {
      isVisible: false,
      modalContent: [],
      backdropStyle,
      modalContainerStyle,
      closeOnBackdropClick,
    };
    this.toggleBeastModal = this.toggleBeastModal.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);
  }
  getChildContext() {
    return {
      toggleBeastModal: this.toggleBeastModal,
      beastModalVisible: this.state.isVisible
    };
  }
  onBackdropClick() {
    this.setState({ isVisible: false });
  }
  toggleBeastModal({ modalContent = null, isVisible = false }) {
    this.setState({
      modalContent,
      isVisible
    });
  };
  render() {
    const { isVisible, modalContent, backdropStyle, closeOnBackdropClick } = this.state;
    return (
      <div>
        <Modal
          isVisible={isVisible}
          modalContent={modalContent}
          backdropStyle={backdropStyle}
          onBackdropClick={closeOnBackdropClick ? this.onBackdropClick: () => {}}
        />
        {this.props.children}
      </div>
    );
  }
}

ModalProvider.childContextTypes = {
  toggleBeastModal: PropTypes.func,
  beastModalVisible: PropTypes.bool
};

ModalProvider.propTypes = {
  backdropStyle: PropTypes.object,
  modalContainerStyle: PropTypes.object,
  closeOnBackdropClick: PropTypes.bool
};

export function withModal(Component) {
  class GetContext extends React.Component {
    render() {
      return <Component { ...this.props } { ...this.context } />
    }
  }

  GetContext.contextTypes = {
    toggleBeastModal: PropTypes.func,
    beastModalVisible: PropTypes.bool
  };

  return GetContext;
}
