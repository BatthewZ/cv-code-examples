import {Link} from '../misc/link';
import {ModalBlurb} from '../misc/modalBlurb';

export const ChargingCharacteristicsBlurb = (
  <ModalBlurb
    title={'Charging Characteristics'}
    content={
      <>
        <p>
          The modelling approach is described in detail in:
          <br />
          <strong>
            {' '}
            Impacts of Electrifying Public Transit on The Electricity Grid, From Regional to State Level Analysis,
            Purnell et al., 2022, Applied Energy (307)
          </strong>
          , <Link link={'https://doi.org/10.1016/j.apenergy.2021.118272'} />
        </p>
        <p>
          <strong>Vehicle and Charge Scheduling Approach</strong>
        </p>
        <p>
          A first in, first out heuristic approach was used with a single, aggregated depot to balance computational
          time for our method with the geographic spread under consideration. As this method is designed to be used for
          any transit agency with public GTFS data without the need for specific information regarding the number of
          depots or number of vehicles, it was simplified to a single depot problem. Each vehicle is scheduled for the
          entire week, maximising the number of trips it can perform and only adding more vehicles when the existing
          vehicles cannot satisfy all the trips.
        </p>
        <div className='centerChildren'>
          <img src={require('../../img/chars_chargeCharsBlurb_aggregatedDepot.png')} />
          <p>
            <i>Figure 1: Physical paths and resulting state of charge (SOC) of example vehicles </i>
          </p>
        </div>
        <p>
          Figure 1 shows an example of a simplified network and trip timetable. Vehicle 1 starts at the depot and
          deadheads to the start of the trip with the earliest start time, T0, to location C. After it completes T0, the
          vehicle has the choice to either deadhead back to the depot or perform another trip, which it searches for
          chronologically between the end of its last trip and twice the time it would take to deadhead back to the
          depot. The upper constraint exists to ensure there is not an excess of vehicles parked at
          terminals/stops/wharves for long periods of time, causing congestion.
        </p>
        <p>
          T1 starts too early, so it is discarded. T2 starts at an appropriate time but requires another deadhead trip
          to reach location E. After T2, T3 starts too early when incorporating the deadhead trip time to reach location
          B, so Vehicle 1 remains idle at stop D until T4 starts. Finally, Vehicle 1’s SOC is too low to perform any
          other trips, so it is scheduled to return to the depot, and scheduling for Vehicle 2 is initialized.
        </p>
        <p>
          <strong>Generalised Depot Location</strong>
        </p>
        <p>
          To keep this tool generalised, we have assumed an approximate depot location per transit agency relative to
          the start and endpoints of trips rather than defining the exact depot locations. We assume that, on average,
          all trips will start/end within a certain number of minutes from the depot location. We assume only one depot
          per agency and that vehicles are not shared across transport agencies. Queuing at the depot and opportunity
          charging points were not included in this modelling, and it was assumed that all vehicles could be charged at
          any given time. These are areas of future work.
        </p>
        <p>
          For a highly meshed transport network like a city public bus network, we assume trips will extend radially
          from a depot and, therefore, that the depot will be easily accessible by all stops. For regional bus routes
          that traverse two or more regional city centres or points of interest far away from another, one can imagine a
          depot at each end. The stops at the start/end of trips likely happen close to each end, so we can approximate
          that these stops will also be within a small radius of a depot. These imagined depots are aggregated into one
          depot, approximating this to a SDVSP.
        </p>
        <p>
          While in some cases, agencies might operate from multiple depots or share depots in congested areas with
          another agency, this information is not always available and therefore, as a preliminary estimation tool
          without data on depot or fleet specifics, we consider this assumption reasonable.
        </p>
        <div className='centerChildren'>
          <img src={require('../../img/chars_chargeCharsBlurb_fig2.png')} />
          <p>
            <i>
              Figure 2: The depot location is generalised to be an average travel time away from the location of any
              trip’s start/end stop
            </i>
          </p>
        </div>
      </>
    }
  />
);
