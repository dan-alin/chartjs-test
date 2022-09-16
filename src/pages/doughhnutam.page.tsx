import { DoughnutChartAM } from '@components/charts';
import { DoughnutData } from '@typings/charts';
import React, { FC } from 'react';
import { AMChartDataGenerator } from 'src/utils';
const customAmdoughnutData = AMChartDataGenerator('am_doughnut', 100, [
  'Cash',
  'Equity',
  'Bond',
  'Altro',
]) as DoughnutData[];

const DoughnutAm: FC = () => {
  return (
    <DoughnutChartAM
      customData={customAmdoughnutData}
      customOptions={{ hideLegend: true, windowHeight: true }}
    ></DoughnutChartAM>
  );
};

export default DoughnutAm;
