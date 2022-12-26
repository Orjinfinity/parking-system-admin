import React, { Dispatch } from 'react'
import { ICarRow } from '../../consts';

interface IUpdateCar {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedCar: ICarRow;
}

const UpdateCar = ({ modalIsOpen, setModalIsOpen ,selectedCar } : IUpdateCar) => {
  return (
    <div>UpdateCar</div>
  )
}

export default UpdateCar