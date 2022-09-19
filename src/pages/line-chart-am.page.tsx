import React, { FC } from 'react';
import { LineChartAm } from '@components/charts';
import { AMChartDataGenerator } from 'src/utils';
const customLineAm = AMChartDataGenerator('am_linearea');
import { chartEvents } from 'src/models/events.model';

const LineChartAmPage: FC = () => {
  document
    .getElementById('chartEvents')
    ?.addEventListener(chartEvents.LINEAREA, (data: any) =>
      console.log('--------------evento ricevuto', data.detail)
    );

  return (
    <LineChartAm
      customData={customLineAm}
      customOptions={{ windowHeight: true }}
    ></LineChartAm>
  );
};

export default LineChartAmPage;
