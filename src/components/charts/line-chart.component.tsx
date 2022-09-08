import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Chart,
} from 'chart.js';
import { LineChartProps } from '@typings/charts.d';
import './charts.style.scss';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import useChart from 'src/hooks/use-chart.hook';
import zoomPlugin from 'chartjs-plugin-zoom';

const alwaysShowTooltip = {
  id: 'alwaysShowTooltip',
  afterDraw(chart: Chart<'line'>) {
    const { ctx } = chart;

    ctx.save();
    chart.data.datasets.forEach((_, i) => {
      // console.log(chart.getDatasetMeta(i).data.length - 1)
      const currentDataset = chart.getDatasetMeta(i).data;

      const { x, y } =
        currentDataset[currentDataset.length - 1].tooltipPosition();

      const text = `${
        chart.data.datasets[i].data[chart.data.datasets[i].data.length - 1]
      }%`;
      // const textWidth = ctx.measureText(text).width

      ctx.fillStyle = currentDataset[currentDataset.length - 1].options
        .borderColor as string;
      //x,y,w,h
      ctx.fillRect(x, y - 10, 40, 20);

      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(text, x + 10, y);
    });
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const LineChart: FC<LineChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
  customFill,
  // showAlwaysTooltip,
}) => {
  const { data, chartRef, options } = useChart(
    'line',
    customOptions,
    customData,
    customFill
    // showAlwaysTooltip ? [alwaysShowTooltip] : []
  );

  return (
    <div className={`chart__container chart__container--${size}`}>
      <Line
        plugins={[alwaysShowTooltip]}
        options={options}
        data={data}
        ref={chartRef}
      />
    </div>
  );
};

export default LineChart;
