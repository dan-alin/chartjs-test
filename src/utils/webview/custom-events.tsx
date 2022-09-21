/* eslint-disable no-undef */
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
    callback: EventListenerOrEventListenerObject,
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode) {
      eventNode.addEventListener(label, callback);
    }
  },
  remove: (
    labels: string[],
    callbacks: EventListenerOrEventListenerObject[],
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode && labels) {
      labels.forEach((label, i) => {
        eventNode.removeEventListener(label, callbacks[i]);
        console.log(`--- removed ${label} ---`);
      });
    }
  },
};

export default customChartEvent;
