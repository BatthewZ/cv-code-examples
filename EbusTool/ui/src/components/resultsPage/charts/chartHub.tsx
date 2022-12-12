import {AvgHourlyMaxChart} from './agency_avgMaxDemand';
import {AvgVehicleHourlyChart} from './agency_avgVehicleHourly';
import {VehicleTracesHourlyChart} from './vehicleTracesHourly.tsx';

type ChartHubProps = {
  allData: any;
  selectedChart?: string;
};

export const ChartHub: React.FC<ChartHubProps> = ({allData, selectedChart}: ChartHubProps) => {
  switch (selectedChart) {
    case 'avgVehicleHourly':
      return <AvgVehicleHourlyChart data={allData.agencyTraces.averageVehicleHourlyData} />;
    case 'agencyMaximumDemandHourly':
      return <AvgHourlyMaxChart data={allData.agencyTraces.agencyMaximumDemandHourly} />;
    case 'vehicleTraces':
      return <VehicleTracesHourlyChart data={allData.vehicleTraces} />;
  }
  return <div></div>;
};
