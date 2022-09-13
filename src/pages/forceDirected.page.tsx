import { ForceDirectedchart } from '@components/charts';
import React, { FC } from 'react';
import { AMChartDataGenerator } from 'src/utils/generators/generators';

const ForceDirectedChart: FC = () => {
  const customForceDirectedData = AMChartDataGenerator('force_directed', 40);

  return <ForceDirectedchart customData={customForceDirectedData} />;
};

export default ForceDirectedChart;
