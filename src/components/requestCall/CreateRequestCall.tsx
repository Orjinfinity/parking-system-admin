import React, { Dispatch } from 'react'

interface ICreateRequestCall {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateRequestCall = ({ modalIsOpen, setModalIsOpen }: ICreateRequestCall) => {
  return (
    <div>CreateRequestCall</div>
  )
}

export default CreateRequestCall