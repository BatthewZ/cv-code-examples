import {getNewCharacteristicsFormState} from '../formstate/characteristics_formstate';

export function makeMyCode() {
  let code = '';
  // for (const key of 'depotChargeRate oppChargeRate batteryCapacity batterySize energyConsumptionAvg'.split(' ')) {
  //   code += `if (!formState.${key}) {
  //     setError('${key}', 'You must set a valid number for ${key}');
  //     isValid = false;
  //   } else {
  //     const ${key} = +formState.${key};
  //     if (${key} <= 0) {
  //       setError('${key}', 'You must set a valid number for${key}');
  //       isValid = false;
  //     }
  //   }\n`;
  // }

  // for (const key of Object.keys(formState)) {
  //   code += `case "${key}":\n`;
  // }

  code += 'break;';
  console.log(code);
}

function makeMyCharValidation() {
  let code = `function formIsValid() {
        let isValid = true;
        let scrollToViewId = '';\n\n`;

  // 'depotChargeRate oppChargeRate batteryCapacity batterySize energyConsumptionAvg'
  let counter = 0;
  for (const key of Object.keys(getNewCharacteristicsFormState())) {
    switch (key) {
      case 'depotChargeRate':
      case 'oppChargeRate':
      case 'batteryCapacity':
      case 'batterySize':
      case 'energyConsumptionAvg':
        code += `if (!formState.${key}) {
        setError('${key}', 'You must set a valid number for ${key}');
        isValid = false;
        scrollToViewId = scrollToViewId ? scrollToViewId : '#${key}-InputContainer';
      } else {
        const ${key} = +formState.${key};
        if (${key} <= 0) {
          setError('${key}', 'You must set a valid number for${key}');
          isValid = false;
          scrollToViewId = scrollToViewId ? scrollToViewId : '#${key}-InputContainer';
        }
      }\n\n`;
        counter++;
        break;
      case 'chargeLocation':
      case 'depotChargeType':
      case 'oppChargeType':
      case 'avgVehicleSpeed':
      case 'minLayoverTime':
      case 'chargerToVehicle':
      case 'gridToChargerDepot':
      case 'gridToChargerEmergency':
      case 'depotTravelTime':
        code += `if (!formState.${key}) {
            setError('${key}', 'You must select a ${key}!');
            isValid = false;
      
            scrollToViewId = scrollToViewId ? scrollToViewId : '#${key}-InputContainer';
          }\n\n`;
        break;
      case 'socMin':
        // use 'socRange' to represent both 'socMin' and 'socMax'
        code += `if (formState.socMin && formState.socMax) {
                const min = +formState.socMin;
                const max = +formState.socMax;
            
                // Should the min socrange ever be allowed to be 0?
                if (min > max || min < 0 || max <= 0) {
                  setError('socRange', 'You must set a valid SOC range!');
                  isValid = false;
            
                  scrollToViewId = scrollToViewId ? scrollToViewId : '#chargeLocation-InputContainer';
                }
              } else {
                setError('socRange', 'You must set a valid SOC range!');
                isValid = false;
            
                scrollToViewId = scrollToViewId ? scrollToViewId : '#chargeLocation-InputContainer';
              }\n\n`;
        counter += 2;
        break;
    }
  }

  code += '}\n\n';

  if (counter !== Object.keys(getNewCharacteristicsFormState()).length)
    console.log(
      `CAUTION: The number of code blocks generated does not match the number of keys in the Characteristics Form State. 
      Please ensure that all of the keys are being validated, and update makeMyCharValidation() to match.`
    );
}
