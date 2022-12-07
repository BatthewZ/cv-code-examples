import React, {useEffect, useState} from 'react';
import '../../style/loadingModal.css';

type ModalProps = {
  content: JSX.Element | string;
  isActive: boolean;
  closeButton?: Function;
};

export const LoadingModal: React.FC<ModalProps> = ({content: message, isActive, closeButton}: ModalProps) => {
  const [displayStyle, setStyle] = useState<'flex' | 'none'>('flex');
  useEffect(() => {
    if (isActive) {
      setStyle('flex');
    } else {
      setStyle('none');
    }
  }, [isActive]);
  return (
    <div className='modalContainer'>
      <div className='loadingModal fadeInOnLoad' style={{display: displayStyle}}>
        {closeButton ? (
          <div
            className='closeX'
            onClick={() => closeButton()}
            aria-label='Close Modal Button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                closeButton();
              }
            }}
          >
            X
          </div>
        ) : (
          ''
        )}
        {message}
      </div>
    </div>
  );
};
