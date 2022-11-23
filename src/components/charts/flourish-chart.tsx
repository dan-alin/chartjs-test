import { AmCustomOptions, ChartSize } from '@typings/charts';
import React, { FC, useEffect, useState } from 'react';
import useWindowSize, { WindowSize } from 'src/hooks/window-size.hook';

interface FlourishChartProps {
  dataId: string | undefined;
  customOptions: AmCustomOptions;
  size?: ChartSize | undefined;
}

const FlourishChart: FC<FlourishChartProps> = ({
  dataId,
  customOptions,
  size,
}) => {
  const windowSize: WindowSize = useWindowSize(true, 100, 60);
  const [chartOptions, setChartOptions] = useState<AmCustomOptions>({});

  useEffect(() => {
    const script = document.createElement('script');
    setChartOptions(customOptions);

    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [dataId, customOptions]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      <iframe
        src={`https://flo.uri.sh/visualisation/${dataId}/embed`}
        title='Interactive or visual content'
        className='flourish-embed-iframe'
        scrolling='no'
        style={
          chartOptions.windowHeight
            ? { width: '90%', height: windowSize.height }
            : { width: '90%', height: '450px' }
        }
        sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
      ></iframe>
    </div>
  );
};

export default FlourishChart;
