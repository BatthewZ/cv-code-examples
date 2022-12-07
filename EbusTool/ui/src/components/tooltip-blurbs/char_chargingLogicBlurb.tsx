import {Link} from '../misc/link';
import {ModalBlurb} from '../misc/modalBlurb';

export const ChargingLogicBlurb = (
  <ModalBlurb
    title={'Charging Logic'}
    content={
      <>
        <p>
          This tool supports four types of charging logic, which change depending on the locations that support
          charging.
        </p>
        <p>
          <strong>When Depot charging location is selected:</strong>
        </p>
        <p className='indentText bold'>1. End of Service: Unconstrained</p>
        <p>
          This is referred to elsewhere as overnight charging. It assumes that vehicles will continue performing fared
          trips until the state-of-charge (SOC) of the vehicle is near the lower allowable SOC bound. At that point, the
          vehicle will return to the depot to plug-in charge until fully charged. No partial charging or charging at
          stops is allowed.
        </p>
        <p className='indentText bold'>2. End of Service: Non-peak</p>
        <p>
          As per End of Service: Unconstrained, but charging is prioritised outside of daily peak period 6 PM and 8 PM.
          Any charging that starts outside of peak hours at the depot starts as usual. If the charge is set to continue
          through the peak period, it is paused and resumed once the peak period is over. Any charging that is set to
          start within the peak period is delayed until the peak period ends.
        </p>
        <p>
          <strong>When Depot and Terminals location is selected:</strong>
        </p>
        <p className='indentText bold'>3. During Service: Unconstrained</p>
        <p>
          This is referred elsewhere as opportunity charging. It assumes vehicles can plug-in charge at both the depot
          and at bus stops at the end of the trip while the vehicle waits until the next trip starts. The vehicle is
          scheduled to return to the depot to charge when the SOC is too low to perform other trips. Vehicles are
          allowed to partially charge in between trips in addition to fully charging at the depot when necessary.
        </p>
        <p className='indentText bold'>4. During Service: Sunshine Soak</p>
        <p>
          As per During Service: Unconstrained but charging is prioritised between 5 AM and 6 PM. Any charging that
          starts within the targeted sunshine hours at the depot is allowed to charge until full. Any charging that is
          set to start outside of sunshine hours at the depot is delayed until the next sunshine hour period starts
          (same day or next day). Standard opportunity charging at terminals is allowed regardless of time of day.
        </p>
      </>
    }
  />
);
