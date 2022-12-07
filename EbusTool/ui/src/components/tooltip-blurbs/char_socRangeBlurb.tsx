import {ModalBlurb} from '../misc/modalBlurb';

export const SOCRangeBlurb = (
  <ModalBlurb
    title={'Allowable Battery State of Charge Range'}
    content={
      <>
        <p>
          Please note that this tool does not include non-linear charging effects which occur when batteries approach
          full charge.
        </p>
      </>
    }
  />
);
