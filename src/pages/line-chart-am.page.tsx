import React, { FC } from 'react';
import { LineChartAm } from '@components/charts';
import { AMChartDataGenerator } from 'src/utils';
const customLineAm = AMChartDataGenerator('am_linearea');

const LineChartAmPage: FC = () => {
  return (
    <LineChartAm
      customData={customLineAm}
      customOptions={{ windowHeight: true }}
    ></LineChartAm>
  );
};

export default LineChartAmPage;
