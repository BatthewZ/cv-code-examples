import {useState} from 'react';

type delButtonProps = {confirmDelete: Function};

export const DeleteButton: React.FC<delButtonProps> = ({confirmDelete}: delButtonProps) => {
  const [button, setButton] = useState(getDelButton());

  function getDelButton() {
    return (
      <button className='btn' onClick={() => setButton(getConfirmButtons())}>
        Delete
      </button>
    );
  }

  function getConfirmButtons() {
    return (
      <div className='column'>
        <button className='btn-danger' onClick={() => confirmDelete()}>
          Confirm Delete
        </button>
        <button className='btn' onClick={() => setButton(getDelButton())}>
          Cancel
        </button>
      </div>
    );
  }

  return <div>{button}</div>;
};
