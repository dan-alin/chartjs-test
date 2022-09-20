import { ChartEventData } from '@typings/chartEvents';
import { chartEvents } from 'src/models/events.model';

const customChartEvent = {
  dispatch: (
    label: chartEvents = chartEvents.CHART,
    data: ChartEventData = {},
    bubbles = false,
    eventNode = document.getElementById('chartEvents')
  ): void => {
    if (eventNode) {
      const customEvent = new CustomEvent(label, {
        bubbles,
        detail: data,
      });
      eventNode?.dispatchEvent(customEvent);
      console.log(`--- emit ${label} ---`, customEvent.detail);
    }
  },
  listen: (
    label: chartEvents = chartEvents.CHART,
    callback?: (data?: ChartEventData) => void,
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode) {
      eventNode.addEventListener(label, (data: any) => {
        console.log(`--- evento ricevuto ${label} ---`, data.detail);
        if (callback) {
          callback(data?.detail as ChartEventData);
        }
      });
    }
  },
};

export default customChartEvent;
