import React from 'react';
import {ViewLabel} from '../types/types';
import {DownloadCharView} from '../views/downloadCharView';

type SVProps = {
  setView: React.Dispatch<React.SetStateAction<ViewLabel>>;
  currentView?: ViewLabel;
};

export const SelectView: React.FC<SVProps> = ({setView, currentView}) => {
  if (currentView === 'teamBuffs' || currentView === 'teamSummary') return <></>;

  if (currentView === 'download')
    return (
      <div className='fadeInOnLoad'>
        <DownloadCharView />
        <button onClick={() => setView(undefined)}>Go Back</button>
      </div>
    );

  return (
    <div className='fadeInOnLoad'>
      <h2>What would you like to do?</h2>
      <button onClick={() => setView('download')}>Download Character Into Grim Dawn</button>
      <button onClick={() => setView('teamBuffs')}>Calculate and View Team Buffs</button>
    </div>
  );
};
