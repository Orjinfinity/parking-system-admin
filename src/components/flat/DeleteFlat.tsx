import React, { Dispatch } from 'react'
import { IFlatRow } from '../../consts';

interface IDeleteFlat {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedFlat: IFlatRow
}

const DeleteFlat = ({ modalIsOpen, setModalIsOpen, selectedFlat } : IDeleteFlat) => {
  return (
    <div>DeleteFlat</div>
  )
}

export default DeleteFlat