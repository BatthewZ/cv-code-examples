import {Link} from '../misc/link';
import {ModalBlurb} from '../misc/modalBlurb';

export const SelectAgencyBlurb = (
  <ModalBlurb
    title={'Select Agency'}
    content={
      <>
        <p>
          Please note that each transit agency has slightly different naming conventions for their agencies and display
          their data in different ways. You can find more information about the geographical area covered by each
          transit agency on the relevant public transit websites:
        </p>

        <strong>Australian Capital Territory (ACT)</strong>
        <ul className='noList'>
          All regions can be found at{' '}
          <Link url={'https://www.transport.act.gov.au/contact-us/information-for-developers'} />. It only contains one
          agency for the state.
        </ul>

        <strong>New South Wales (NSW)</strong>
        <ul className='noList'>
          All regions can be found at{' '}
          <Link url={'https://opendata.transport.nsw.gov.au/dataset/timetables-complete-gtfs'} />. Multiple different
          agencies are included in this dataset, including duplicate transit agencies with unique IDs to account for
          separate locations.
        </ul>
        <strong>Northern Territory (NT)</strong>
        <ul className='noList'>
          The NT GTFS data is separated into Darwin (
          <Link url='https://data.nt.gov.au/dataset/bus-timetable-data-and-geographic-information-darwin' />) and Alice
          Springs (
          <Link url='https://data.nt.gov.au/dataset/bus-timetable-data-and-geographic-information-alice-springs' />
          ), which both contain one unique transit agency.
        </ul>

        <strong>Queensland (QLD)</strong>
        <ul className='noList'>
          The QLD GTFS data is separated into South East QLD (
          <Link url='https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-seq' />) and various
          regional locations (all listed{' '}
          <Link url='https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-qconnect' />
          ). Each dataset contains a unique transit agency.
        </ul>

        <strong>South Australia (SA)</strong>
        <ul className='noList'>
          Lists information for Adelaide metro (
          <Link url='https://data.sa.gov.au/data/dataset/https-gtfs-adelaidemetro-com-au' />
          ), and contains multiple transit agencies.
        </ul>

        <strong>Tasmania (TAS)</strong>
        <ul className='noList'>
          The TAS GTFS data is separated into three regions; the North West, the North, and the South. All are
          available: <Link url='https://www.metrotas.com.au/community/gtfs/' />, and contain various transit agencies.
        </ul>

        <strong>Victoria (VIC)</strong>
        <ul className='noList'>
          VIC GTFS data is separated by transit vehicle mode (bus, ferry, etc.) rather than by geography and can be
          found:{' '}
          <Link url='https://discover.data.vic.gov.au/dataset/ptv-timetable-and-geographic-information-2015-gtfs' />
        </ul>

        <strong>Western Australia (WA)</strong>
        <ul className='noList'>
          All regions can be found: <Link url='https://www.transperth.wa.gov.au/About/Spatial-Data-Access' />. It
          contains multiple agencies.
        </ul>
      </>
    }
  />
);
