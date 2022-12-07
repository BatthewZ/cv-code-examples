import {ModalBlurb} from '../misc/modalBlurb';

export const AvgVehicleSpeedBlurb = (
  <ModalBlurb
    title={'Average Vehicle Speed'}
    content={
      <>
        <p>
          This speed is only used for the vehicle’s deadhead travel between to and from the depot, and between scheduled
          trips to calculate the duration. For scheduled trips, the nominated duration in the GTFS input files are used.
        </p>
      </>
    }
  />
);
