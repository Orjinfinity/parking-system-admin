import React, { Dispatch } from 'react'

interface ICreateCar {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateCar = ({ modalIsOpen, setModalIsOpen } : ICreateCar) => {
  return (
    <div>CreateCar</div>
  )
}

export default CreateCar