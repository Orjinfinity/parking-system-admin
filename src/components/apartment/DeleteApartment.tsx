import React, { Dispatch } from 'react'
import { IApartmentRow } from '../../consts';

interface IDeleteApartment {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedApartment: IApartmentRow;
}

const DeleteApartment = ({ modalIsOpen, setModalIsOpen, selectedApartment}: IDeleteApartment) => {
  return (
    <div>DeleteApartment</div>
  )
}

export default DeleteApartment