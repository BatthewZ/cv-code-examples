import {useState} from 'react';
import {getAttributesArray} from '../../../helper/attributes';
import {calcModifier} from '../../../helper/calculateModifier';
import {RollButton} from '../../miscUI/rollButton';

type rollProps = {
  setDiceModal: Function;
  getAttributeState: Function;
};

export const RollToHit: React.FC<rollProps> = ({setDiceModal, getAttributeState}) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');

  function getModifier() {
    if (!selectedAttribute) return 0;

    return calcModifier(getAttributeState(selectedAttribute));
  }

  function getOptions() {
    return getAttributesArray().map((attribute) => <option value={attribute}>{attribute}</option>);
  }
  return (
    <div className='row centerChildren'>
      <RollButton setDiceModal={setDiceModal} modifier={getModifier()} />
      {/* <button>Roll</button> */}
      <select onChange={(e) => setSelectedAttribute(e.currentTarget.value)}>
        <option value=''>Select Attribute...</option>
        {getOptions()}
      </select>
    </div>
  );
};
