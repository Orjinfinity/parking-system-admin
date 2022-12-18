import React, { Dispatch, PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { customStyles } from '../../consts';
import Button from '../button/Button';
import CloseIcon from '../icons/CloseIcon';
import View from '../view/View';

interface IModal extends PropsWithChildren{
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  maxWidth?: string;
}

const StyledButtonContainer = styled(View)`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const Modal = ({ modalIsOpen, setModalIsOpen, maxWidth = "900px", children }: IModal) => {
  const customStylesForModal = {
    ...customStyles,
    content: {
      ...customStyles.content,
      maxWidth
    }
  }
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      style={customStylesForModal}
    >
      {children}
      <StyledButtonContainer>
        <Button variant="icon" padding="0" onClick={() => setModalIsOpen(false)}>
          <CloseIcon size="24px" color="textSecondaryColor" />
        </Button>
      </StyledButtonContainer>
    </ReactModal>
  );
};

export default Modal;
