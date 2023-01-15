import React, { Dispatch } from 'react';
import { IGateProcesRow } from '../../consts';

interface IDeleteGateProces {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedGateProces: IGateProcesRow;
}

const DeleteGateProces = ({
  modalIsOpen,
  setModalIsOpen,
  selectedGateProces,
}: IDeleteGateProces) => {
  return <div>DeleteGateProces</div>;
};

export default DeleteGateProces;
