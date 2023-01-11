import React, { Dispatch } from 'react'
import { IRequestCallRow } from '../../consts';

interface IDeleteRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedRequestCall: IRequestCallRow;
}

const DeleteRequestCall = ({ modalIsOpen, setModalIsOpen, selectedRequestCall }: IDeleteRequestCall) => {
  return (
    <div>DeleteRequestCall</div>
  )
}

export default DeleteRequestCall