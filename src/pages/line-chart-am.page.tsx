import { LineChartAm } from '@components/charts';
import React, { FC } from 'react';
import { AMChartDataGenerator } from 'src/utils';
const customLineAm = AMChartDataGenerator('am_linearea');

const LineChartAmPage: FC = () => {
  return <LineChartAm customData={customLineAm}></LineChartAm>;
};

export default LineChartAmPage;
