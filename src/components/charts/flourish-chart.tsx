import React, { FC, useEffect } from 'react';

const FlourishChart: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className='flourish-embed flourish-chart'
      data-src='visualisation/11069148' // 11097038 bubble
    ></div>
  );
};

export default FlourishChart;
