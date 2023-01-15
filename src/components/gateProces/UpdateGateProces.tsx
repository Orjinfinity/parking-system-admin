import React, { Dispatch } from 'react';
import { IGateProcesRow } from '../../consts';

interface IUpdateGateProces {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  selectedGateProces: IGateProcesRow;
}

const UpdateGateProces = ({
  modalIsOpen,
  setModalIsOpen,
  selectedGateProces,
}: IUpdateGateProces) => {
  return <div>UpdateGateProces</div>;
};

export default UpdateGateProces;
