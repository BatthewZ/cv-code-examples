import {useEffect, useState} from 'react';
import {mapDetails} from '../components/details';
import {displayBenefits} from '../skillBenefits/displayBenefits';
import {Character, Skill} from '../types/types';

type BaSProps = {
  skills: Skill[];
  paragraph: string;
  isDebuff?: boolean;
};

export const BenefitsAndSkills: React.FC<BaSProps> = ({skills, paragraph, isDebuff}) => {
  return (
    <div className='fadeInOnLoad'>
      {paragraph ? <p className='textJustify'>{paragraph}</p> : ''}
      <div className='row center spaceEvenly'>
        <div className='column width50'>
          <h3>Contributing Skills:</h3>
          {mapDetails(skills)}
        </div>
        <div className='benefitsColumn'>
          <h3 className='center'>Benefits:</h3>
          <div>{isDebuff ? displayBenefits(skills, 'debuff') : displayBenefits(skills)}</div>
        </div>
      </div>
    </div>
  );
};
