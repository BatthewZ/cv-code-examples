import {useState} from 'react';

type DeleteButtonProps = {
  onDelete: Function;
  buttonLabel?: string;
};

// Use with caution. Had some UI update issues when using onDelete in a mapped list of components.

export const DeleteButton: React.FC<DeleteButtonProps> = ({onDelete, buttonLabel}: DeleteButtonProps) => {
  const [view, setView] = useState(delButton());

  function confirmButtons() {
    return (
      <div className='fadeInOnLoad'>
        <button onClick={() => onDelete()}>Confirm</button>
        <button onClick={() => setView(delButton())}>Cancel</button>
      </div>
    );
  }

  function delButton() {
    return (
      <button className='fadeInOnLoad' onClick={() => setView(confirmButtons())}>
        {buttonLabel ?? 'Delete'}
      </button>
    );
  }
  return <div>{view}</div>;
};
