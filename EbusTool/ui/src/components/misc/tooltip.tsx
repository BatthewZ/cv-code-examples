import {BlurbInfo} from '../../helper/types';

export type ToolTipType = {
  onClick: Function;
};

export const ToolTip: React.FC<ToolTipType> = ({onClick}: ToolTipType) => {
  return (
    <div
      className='toolTip'
      onClick={() => {
        onClick();
      }}
      aria-label='Open Tooltip'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className='toolTipQ'>?</div>
    </div>
  );
};
