import React from 'react';
import '../../styles/table.css';

export const Table: React.FC = () => {
  const superHeadings = [
    'Average Vehicle Electricity Consumption (MWh / week / vehicle)',
    'Total Yearly Electricity Consumption (GWh/year)',
    'Number of Vehicles',
  ];
  const topheadings = ['', 'EOS', 'DS', 'IS', 'EOS', 'DS', 'IS', 'EOS', 'DS', 'IS'];
  const rows = [`Private Bus,1.0,1.0,,45,45,,764,745,`, 'Bus,1.6,1.7,,748,708,,9245,8379,'];

  function getSuperHeadings(superHeadings: string[]) {
    return (
      <tr>
        <td></td>
        {superHeadings.map((heading) => (
          <th colSpan={3} className='superHeading'>
            {heading}
          </th>
        ))}
      </tr>
    );
  }

  function getTopHeadings(topHeadings: string[]) {
    return (
      <tr>
        {topHeadings.map((heading) => (
          <th>{heading}</th>
        ))}
      </tr>
    );
  }

  function getRows(rows: string[]) {
    return (
      <>
        {rows.map((row) => {
          return <tr>{row.split(',').map((cell, index) => (index > 0 ? <td>{cell}</td> : <th>{cell}</th>))}</tr>;
        })}
      </>
    );
  }

  return (
    <table className='table'>
      {getSuperHeadings(superHeadings)}
      {getTopHeadings(topheadings)}
      {getRows(rows)}
    </table>
  );
};
