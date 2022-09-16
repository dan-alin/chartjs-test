import React, { FC } from 'react';
import { LineChartAm } from '@components/charts';
import { AMChartDataGenerator } from 'src/utils';
const customLineAm = AMChartDataGenerator('am_linearea');
import { emitCustomEvent } from 'react-custom-events';
import { chartEvents } from 'src/models/events.model';
import useWindowDimensions from 'src/hooks/window-size.hook';

const LineChartAmPage: FC = () => {
  const { height, width } = useWindowDimensions();
  const lineEvent = new CustomEvent(chartEvents.LINEAREA, {
    bubbles: true,
    detail: {
      action: 'this is document event',
    },
  });
  document.dispatchEvent(lineEvent);

  emitCustomEvent(chartEvents.LINEAREA, {
    action: 'loading linearea...',
    date: new Date(),
  });
  console.log('window size', height, width);

  return (
    <LineChartAm
      customData={customLineAm}
      customOptions={{ windowHeight: true }}
    ></LineChartAm>
  );
};

export default LineChartAmPage;
