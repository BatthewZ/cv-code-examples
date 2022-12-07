import {useEffect, useState} from 'react';
import {AttributeType} from '../../../types/types';

type SkillProps = {
  title: string;
  attribute: AttributeType;
  value: number;
  profBonus: string | number;
  updateProficiencies: Function;
  defaultChecked?: boolean;
};

export const Skill: React.FC<SkillProps> = ({
  title,
  attribute,
  value,
  profBonus,
  defaultChecked = false,
  updateProficiencies,
}: SkillProps) => {
  const [addProfBonus, setAddProfBonus] = useState(defaultChecked);

  // useEffect(() => {
  //   updateProficiencies(title);
  // }, [addProfBonus]);

  return (
    <div className='row'>
      <input
        id={'checkBox-' + title}
        type='checkbox'
        onClick={() => {
          setAddProfBonus(!addProfBonus);
          updateProficiencies(title);
        }}
        alt={'Add Proficiency Checkbox'}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={'checkBox-' + title}>
        {addProfBonus ? value + +profBonus : value} {title} ({attribute.substring(0, 3)})
      </label>
    </div>
  );
};
