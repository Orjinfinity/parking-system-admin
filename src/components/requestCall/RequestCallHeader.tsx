import React from 'react'

interface IRequestCallTableHeader {
  handleRequestCallFunctions: (type: string) => void;
}

const RequestCallHeader = ({ handleRequestCallFunctions }: IRequestCallTableHeader) => {
  return (
    <div>RequestCallHeader</div>
  )
}

export default RequestCallHeader