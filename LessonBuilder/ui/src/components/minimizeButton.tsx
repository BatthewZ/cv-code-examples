import React, {useEffect, useState} from 'react';

type Props = {
  title?: string;
  startMinimized?: boolean;
  onClick: Function;
};

export const MinimizeButton: React.FC<Props> = ({onClick, startMinimized, title = 'See Charts'}: Props) => {
  const [minimized, setMinimized] = useState(startMinimized);
  const [style, setStyle] = useState<React.CSSProperties>(minimized ? flipArrow() : {});
  const [heading, setHeading] = useState('');

  useEffect(() => {
    setStyle(minimized ? flipArrow() : {});
  }, [minimized]);

  function flipArrow() {
    const t = 'rotate(-180deg)';
    return {
      transform: t,
      WebkitTransform: t,
      msTransform: t,
    };
  }

  return (
    <div
      className='row alignCenter'
      onClick={() => {
        setMinimized(!minimized);
        onClick();
      }}
    >
      <div className='minimizeButton'>
        <div className='minimizeButtonText' style={style}>
          ^
        </div>
      </div>
      {minimized ? <div className='h2 clickable'>See Charts</div> : ''}
    </div>
  );
};
