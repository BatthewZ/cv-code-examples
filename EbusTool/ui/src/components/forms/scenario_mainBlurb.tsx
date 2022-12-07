export const ScenarioMainBlurb: React.FC = () => {
  return (
    <div className='blurb'>
      <hr />
      <h1>Transit Input Data</h1>
      <p>Please nominate the input transit data. You can either:</p>
      <ol>
        <li>
          Use data from the default selection. This includes Australian publicly available bus and ferry schedules
          available on each state’s transit website.
        </li>
        <li>Import your own schedule via the “Import” button. </li>
      </ol>
      <p> Then pick the transit agency to investigate and vehicle type, and press “Confirm Scenario”.</p>
      <hr />
    </div>
  );
};
