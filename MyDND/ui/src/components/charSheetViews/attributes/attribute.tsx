import React, {useState} from 'react';
import {calcModifier} from '../../../helper/calculateModifier';
import {capitalizeAllFirstLetters} from '../../../helper/stringFormatters';
import {EditableText} from '../../inputs/EditableText';
import {AttributeType} from '../../../types/types';

type AttributeProps = {
  updateState: Function;
  value: number | string;
  name: AttributeType;
};

export const Attribute: React.FC<AttributeProps> = ({name, updateState, value}: AttributeProps) => {
  const [modifier, setModifier] = useState<number>(value ? calcModifier('' + value) : 0);

  return (
    <div className='attribute'>
      <fieldset>
        <legend>
          <strong>{capitalizeAllFirstLetters(name)}:</strong>
        </legend>
        Score:
        <EditableText
          fieldName={name}
          value={'' + value}
          inputType={'number'}
          confirmEdit={(val: string) => {
            try {
              if (+val > 50) {
                updateState('50');
                setModifier(calcModifier('50'));
                return;
              }
              if (+val <= 0) {
                updateState('0');
                setModifier(calcModifier('0'));
                return;
              }
            } catch (e) {}
            updateState(val);
            setModifier(calcModifier(val));
          }}
          placeholder=' '
        />
        Modifier: {modifier}
      </fieldset>
    </div>
  );
};
