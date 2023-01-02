import {useEffect, useState} from 'react';
import {mapDetails} from '../components/details';
import {displayBenefits, displayBenefitsWithoutHeadings} from '../skillBenefits/displayBenefits';
import {Character, Skill} from '../types/types';

type BaSProps = {
  skills: Skill[];
  paragraph: string;
  isDebuff?: boolean;
  debuffsAsWell?: Skill[];
};

export const BenefitsAndSkills: React.FC<BaSProps> = ({skills, paragraph, isDebuff, debuffsAsWell}) => {
  // concatenated/distinct array:
  const contributingSkills = debuffsAsWell ? Array.from(new Set([...skills, ...debuffsAsWell])) : skills;

  return (
    <div className='fadeInOnLoad'>
      {paragraph ? <p className='textJustify'>{paragraph}</p> : ''}
      <div className='row center spaceEvenly'>
        <div className='column width50'>
          <h3>Contributing Skills:</h3>
          {mapDetails(contributingSkills)}
        </div>
        <div className='benefitsColumn'>
          <h3 className='center'>Benefits:</h3>
          <div>{isDebuff ? displayBenefits(skills, 'debuff') : displayBenefits(skills)}</div>
          {debuffsAsWell ? displayBenefitsWithoutHeadings(debuffsAsWell, 'debuff') : ''}
        </div>
      </div>
    </div>
  );
};
