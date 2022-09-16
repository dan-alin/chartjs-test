import React, { FC, useEffect } from 'react';

interface FlourishChartProps {
  dataId: string | undefined;
}

const FlourishChart: FC<FlourishChartProps> = ({ dataId }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [dataId]);

  return (
    <div>
      <iframe
        src={`https://flo.uri.sh/visualisation/${dataId}/embed`}
        title='Interactive or visual content'
        className='flourish-embed-iframe'
        scrolling='no'
        style={{ width: '90%', height: '450px' }}
        sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
      ></iframe>
    </div>
  );
};

export default FlourishChart;
