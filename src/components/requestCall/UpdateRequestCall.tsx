import React, { Dispatch } from 'react'
import { IRequestCallRow } from '../../consts';

interface IUpdateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedRequestCall: IRequestCallRow;
}

const UpdateRequestCall = ({ modalIsOpen, setModalIsOpen, selectedRequestCall }: IUpdateRequestCall) => {
  return (
    <div>UpdateRequestCall</div>
  )
}

export default UpdateRequestCall