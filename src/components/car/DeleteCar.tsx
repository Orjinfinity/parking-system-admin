import React, { Dispatch } from 'react'
import { ICarRow } from '../../consts';

interface IDeleteCar {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedCar: ICarRow;
}

const DeleteCar = ({ modalIsOpen, setModalIsOpen, selectedCar } : IDeleteCar) => {
  return (
    <div>DeleteCar</div>
  )
}

export default DeleteCar