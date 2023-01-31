import { DoughnutChartAM } from '@components/charts';
import { DoughnutQueryParams } from '@typings/chartEvents';
import { DoughnutOptions, DoughnutData } from '@typings/charts';
import React, { FC, useEffect, useState } from 'react';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';
import { AMChartDataGenerator } from 'src/utils';
import customChartEvent from 'src/utils/webview/custom-events';
const customData = AMChartDataGenerator('am_doughnut', 100, [
  'Cash',
  'Equity',
  'Bond',
  'Altro',
]) as DoughnutData[];

const queryParams = new URLSearchParams(window.location.search);
const params: DoughnutQueryParams = queryParams
  ? Object.fromEntries(queryParams.entries())
  : {};
const webviewOptions: DoughnutOptions = {
  hideLegend: true,
  windowHeight: true,
  isWebview: true,
  rotateFocus: params.rotateFocus || false,
};

const DoughnutAm: FC = () => {
  const [data, setData] = useState<DoughnutData[]>();

  useEffect(() => {
    if (params && !!params.emulateData) {
      setData(customData);
    }

    customChartEvent.listen(
      WebviewCharts.DOUGHNUT,
      WebviewActions.FETCHDATA,
      (domData) => {
        console.log(' *** Chart data from DOM *** ', domData);
        setData((domData as CustomEvent<DoughnutData[]>).detail);
      }
    );
  }, []);

  return (
    <>
      {data && (
        <DoughnutChartAM
          customData={data}
          customOptions={webviewOptions}
          sliceSelect={(data) => console.log('slice ' + data.description)}
        ></DoughnutChartAM>
      )}
    </>
  );
};

export default DoughnutAm;
