import { DoughnutChartAM } from '@components/charts';
import { DoughnutQueryParams } from '@typings/chartEvents';
import { DoughnutOptions, DoughnutData } from '@typings/charts';
import React, { FC, useEffect, useState } from 'react';
import { AMChartDataGenerator } from 'src/utils';
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
  hideLegend: !params.legend,
  windowHeight: true,
  isWebview: true,
  legendPosition: params.legend,
  rotateFocus: params.rotateFocus || false,
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DoughnutAm: FC = () => {
  const [data, setData] = useState<DoughnutData[]>();

  async function fetchData(delay = 0) {
    await sleep(delay);
    console.log('fetch', params.policy);
    setData(customData);
  }

  useEffect(() => {
    if (params) {
      fetchData(params.delay);
    }
  }, []);

  return (
    <>
      {data && (
        <DoughnutChartAM
          customData={data}
          customOptions={webviewOptions}
        ></DoughnutChartAM>
      )}
    </>
  );
};

export default DoughnutAm;
