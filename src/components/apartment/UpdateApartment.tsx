import React, { Dispatch } from 'react'
import { IApartmentRow } from '../../consts';

interface IDeleteApartment {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedApartment: IApartmentRow;
}

const UpdateApartment = ({ modalIsOpen, setModalIsOpen, selectedApartment }: IDeleteApartment) => {
  return (
    <div>UpdateApartment</div>
  )
}

export default UpdateApartment