import { BarChart } from '@components/charts';
import { BarQueryParams } from '@typings/chartEvents';
import { BarChartData, BarChartOptions } from '@typings/charts';
import React, { FC, useEffect, useState } from 'react';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';
import { generateBarData } from 'src/utils';
import customChartEvent from 'src/utils/webview/custom-events';

const queryParams = new URLSearchParams(window.location.search);
const params: BarQueryParams = queryParams
  ? Object.fromEntries(queryParams.entries())
  : {};

const webviewOptions: BarChartOptions = {
  hideLegend: true,
  windowHeight: true,
  isWebview: true,
  hideXAxis: false,
  hideGrid: true,
  barType: params.barType || 'negPositive',
};

const BarWV: FC = () => {
  const [data, setData] = useState<BarChartData[]>();

  useEffect(() => {
    customChartEvent.listen(
      WebviewCharts.BAR,
      WebviewActions.FETCHDATA,
      (data) => {
        console.log('fetch');
        setData((data as CustomEvent<BarChartData[]>).detail);
      }
    );

    if (params && params.emulateData) {
      setData(generateBarData(12, params.barType) as BarChartData[]);
    }

    window.addEventListener('load', () => {
      customChartEvent.dispatch(WebviewCharts.ALL, WebviewActions.READY);
    });
  }, []);

  return (
    <>{data && <BarChart customData={data} customOptions={webviewOptions} />}</>
  );
};

export default BarWV;
