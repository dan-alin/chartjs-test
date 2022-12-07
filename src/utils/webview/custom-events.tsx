/* eslint-disable no-undef */
import { ChartEventData } from '@typings/chartEvents';
import { WebviewCharts, WebviewActions } from 'src/models/events.model';

const customChartEvent = {
  dispatch: (
    chart: WebviewCharts = WebviewCharts.DOUGHNUT,
    action: WebviewActions,
    data: ChartEventData = {},
    bubbles = false,
    eventNode = document.getElementById('chartEvents')
  ): void => {
    if (eventNode) {
      const customEvent = new CustomEvent(`${chart.toUpperCase()}.${action}`, {
        bubbles,
        detail: data,
      });
      eventNode?.dispatchEvent(customEvent);
      console.log(
        `--- emit ${chart.toUpperCase()}.${action} ---`,
        customEvent.detail
      );
    }
  },
  listen: (
    chart: WebviewCharts = WebviewCharts.DOUGHNUT,
    action: WebviewActions,
    callback: EventListenerOrEventListenerObject,
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode) {
      eventNode.addEventListener(`${chart.toUpperCase()}.${action}`, callback);
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
