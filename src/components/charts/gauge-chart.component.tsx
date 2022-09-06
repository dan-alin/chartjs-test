import React, { FC } from 'react';
import './charts.style.scss';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Chart,
  ChartDataset,
} from 'chart.js';
import type { DoughnutChartProps, GaugePlugin } from '@typings/charts';
import { getDefaultData } from 'src/utils/configurations/chart-config';
import useChart from 'src/hooks/use-chart.hook';
import { Button } from '@components/button';
const gaugeNeedle = {
  id: 'gaugeNeedle',

  afterDatasetDraw(chart: Chart<'doughnut'>) {
    const {
      ctx,
      data,
      chartArea: { height },
    } = chart;
    ctx.save();

    const currentDataset = data.datasets[0] as ChartDataset<'doughnut'> &
      GaugePlugin;

    const needle = currentDataset.needleValue || 1;

    const totalData = currentDataset.data.reduce((curr, prev) => {
      return curr + prev;
    }, 0);

    const percentage = Math.round((needle / totalData) * 100);

    const position = (180 / 100) * percentage;

    const degrees = (position * Math.PI) / 180;

    const cx = ctx.canvas.offsetWidth / 2;
    const cy = height;

    // //needle border
    // ctx.translate(cx, cy);
    // ctx.rotate(Math.PI + degrees);
    // ctx.beginPath();
    // ctx.moveTo(0, -7);
    // ctx.lineTo(height - ctx.canvas.offsetTop + 32, -7);
    // ctx.lineTo(height - ctx.canvas.offsetTop + 32, 7);
    // ctx.lineTo(0, 7);
    // ctx.fillStyle = '#FFF';
    // ctx.fill();
    // ctx.restore();

    //needle
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI + degrees);
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.lineTo(height - ctx.canvas.offsetTop + 100, -3);
    ctx.lineTo(height - ctx.canvas.offsetTop + 100, 3);
    ctx.lineTo(0, 3);
    ctx.fillStyle = '#444';
    ctx.fill();

    //needle center
    ctx.translate(-cx, -cy);
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, 15);
    ctx.fill();
    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GaugeChart: FC<DoughnutChartProps> = ({
  size,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const { data, chartRef, options, generateNewData } = useChart(
    'gauge',
    customOptions,
    customData
  );

  return (
    <>
      <div className={`chart__container chart__container--${size}`}>
        <Doughnut
          plugins={[gaugeNeedle]}
          options={options}
          data={data}
          ref={chartRef}
        />
      </div>
      <Button onClick={() => generateNewData(1, 3, 'gauge')}>New Data</Button>
    </>
  );
};

export default GaugeChart;
