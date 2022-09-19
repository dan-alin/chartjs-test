import { ForceDirectedChart } from '@components/charts';
import { ForceDirected } from '@typings/charts';
import React, { FC } from 'react';
import { AMChartDataGenerator } from 'src/utils/generators/generators';

const ForceDirectedPage: FC = () => {
  const customForceDirectedData = AMChartDataGenerator(
    'force_directed',
    20
  ) as ForceDirected;

  return (
    <ForceDirectedChart
      customData={customForceDirectedData}
      customOptions={{ windowHeight: true }}
    />
  );
};

export default ForceDirectedPage;
