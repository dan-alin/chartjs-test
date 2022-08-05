import React, { FC, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions,
} from 'chart.js';

import './charts.style.scss';

import type { PieChartProps } from '@typings/charts';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// const showTooltip = (chart: ChartJS | null) => {
//   console.log(chart)
//   const tooltip = chart?.tooltip;

//   if (!tooltip) {
//     return;
//   }

//   if (tooltip.getActiveElements().length > 0) {

//     tooltip.setActiveElements([], { x: 0, y: 0 });
//   } else {

//     const { chartArea } = chart;
//     tooltip.setActiveElements(

//       [
//         {
//           datasetIndex: 0,
//           index: 2,
//         }
//       ],
//       {
//         x: (chartArea.left + chartArea.right) / 2,
//         y: (chartArea.top + chartArea.bottom) / 2,
//       }
//     );

//   }
//   chart.update();
// }

const data = getDefaultData() as ChartData<'pie'>;

const options: ChartOptions = getDefaultOptions();

const PieChart: FC<PieChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = {},
}) => {
  const chartRef = useRef<ChartJS<'pie'>>(null);

  const chartOptions = _.merge(options, customOptions);
  const chartData = _.merge(data, customData);

  // useEffect(() => {
  //   const chart = chartRef.current;

  //   showTooltip(chart)
  // }, []);

  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Pie ref={chartRef} options={chartOptions} data={chartData} />
    </div>
  );
};

export default PieChart;
