import React from 'react';

type Logo = {
  fontSize?: string;
  color?: string;
};

export const Logo: React.FC<Logo> = ({fontSize, color}: Logo) => {
  const size = fontSize ?? '1.2em';
  const colour = color ?? 'white';
  return (
    <div className='logoText' style={{fontSize: fontSize, color: colour}}>
      LessonBuilder
    </div>
  );
};
