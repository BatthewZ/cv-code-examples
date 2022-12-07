import React, {useEffect, useState} from 'react';
import '../styles/loadingModal.css';

type ModalProps = {
  message: string;
  isActive: boolean;
  closeButton?: boolean;
};

export const LoadingModal: React.FC<ModalProps> = ({message, isActive, closeButton}: ModalProps) => {
  const [displayStyle, setStyle] = useState<'flex' | 'none'>('flex');
  useEffect(() => {
    if (isActive) {
      setStyle('flex');
    } else {
      setStyle('none');
    }
  }, [isActive]);
  return (
    <div className='loadingModal fadeInOnLoad' style={{display: displayStyle}}>
      {closeButton ? (
        <div className='closeX' onClick={() => setStyle('none')}>
          X
        </div>
      ) : (
        ''
      )}
      <div>
        <h1
          // style={{color: 'white'}}
          className='customModalText'
        >
          {message}
        </h1>
      </div>
    </div>
  );
};
