import React, { FC, useEffect, useState } from 'react';
import { LineChartAm } from '@components/charts';
import { LineOptions, LineData } from '@typings/charts';
import { LineQueryParams } from '@typings/chartEvents';
// import customChartEvent from 'src/utils/webview/custom-events';
// import { WebviewActions, WebviewCharts } from 'src/models/events.model';
import * as am5 from '@amcharts/amcharts5';
import customChartEvent from 'src/utils/webview/custom-events';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';

//generate data - remove with real ones
let value = 200;
function generateData(addDay: number): LineData {
  const date: Date = new Date();
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, 'day', addDay);
  return {
    date: date.getTime(),
    value: value,
    isEvent: Math.random() < 0.5,
  };
}

function generateDatas(count: number): LineData[] {
  const data: LineData[] = [];
  for (let i = 0; i < count; ++i) {
    data.push(generateData(i));
  }
  return data;
}

let customLineData: LineData[][] = [];

// ---------------------

const queryParams = new URLSearchParams(window.location.search);
const params: LineQueryParams = queryParams
  ? Object.fromEntries(queryParams.entries())
  : {};
for (let i = 1; i <= (params.emulateLines ? params.emulateLines : 1); i++) {
  customLineData = [...customLineData, generateDatas(3650)];
}

const webviewOptions: LineOptions = {
  hideLegend: true,
  windowHeight: true,
  showRange: false,
  showEvents: false,
  isWebview: true,
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LineChartAmPage: FC = () => {
  const [data, setData] = useState<LineData[][]>();
  async function fetchData(delay = 0) {
    await sleep(delay);
    setData(customLineData);
    // customChartEvent.dispatch(
    //   WebviewCharts.LINE,
    //   WebviewActions.FETCHDATA,
    //   customLineData,
    //   false,
    //   document.getElementById('chartEventsListen')
    // );
  }

  useEffect(() => {
    customChartEvent.listen(
      WebviewCharts.LINE,
      WebviewActions.FETCHDATA,
      (data) => {
        console.log('fetch');
        setData((data as CustomEvent<LineData[][]>).detail);
      }
    );
    if (params && params.emulateLines) {
      fetchData(params.delay);
    }
  }, []);

  return (
    <div>
      {data && (
        <LineChartAm
          customData={data}
          customOptions={webviewOptions}
        ></LineChartAm>
      )}
    </div>
  );
};

export default LineChartAmPage;
