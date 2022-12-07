import {ModalBlurb} from '../misc/modalBlurb';

export const MinLayoverTimeBlurb = (
  <ModalBlurb
    title={'Terminal Charging Window'}
    content={
      <>
        <p>
          For example, a charging window of 5 minutes means that if a vehicle is scheduled to wait at a terminal for
          less than 5 minutes before commencing their next trip, no charging will be considered.
        </p>
      </>
    }
  />
);
