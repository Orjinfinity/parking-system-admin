import React, { Dispatch } from 'react'
import { IFlatRow } from '../../consts';

interface IUpdateFlat {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
    selectedFlat: IFlatRow
}

const UpdateFlat = ({ modalIsOpen, setModalIsOpen, selectedFlat }: IUpdateFlat) => {
  return (
    <div>UpdateFlat</div>
  )
}

export default UpdateFlat