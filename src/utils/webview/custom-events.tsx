/* eslint-disable no-undef */
import { DispatchEvents, ListenEvents } from '@typings/chartEvents';
import { WebviewCharts, WebviewActions } from 'src/models/events.model';

const customChartEvent = {
  dispatch: (
    chart: WebviewCharts = WebviewCharts.DOUGHNUT,
    action: WebviewActions,
    data: DispatchEvents | ListenEvents = {}, // ListenEvents only for develop webview purpose
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
        `--- Dispatch ${chart.toUpperCase()}.${action} ---`,
        customEvent.detail
      );
    }
  },
  listen: (
    chart: WebviewCharts = WebviewCharts.DOUGHNUT,
    action: WebviewActions,
    callback: (data: CustomEvent<ListenEvents>) => void,
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode) {
      eventNode.addEventListener(
        `${chart.toUpperCase()}.${action}`,
        callback as EventListener
      );
    }
  },
  remove: (
    labels: string[],
    callbacks: ((data: CustomEvent<ListenEvents>) => void)[],
    eventNode = document.getElementById('chartEventsListen')
  ) => {
    if (eventNode && labels) {
      labels.forEach((label, i) => {
        eventNode.removeEventListener(label, callbacks[i] as EventListener);
        console.log(`--- Removed ${label} ---`);
      });
    }
  },
};

export default customChartEvent;
