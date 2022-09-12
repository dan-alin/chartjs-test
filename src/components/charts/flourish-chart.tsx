import React, { FC, useEffect } from 'react';

interface FlourishChartProps {
  dataSrc: string;
}

const FlourishChart: FC<FlourishChartProps> = (props) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [props]);

  return (
    <div>
      <iframe
        src={`https://flo.uri.sh/visualisation/${props.dataSrc}/embed`}
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
