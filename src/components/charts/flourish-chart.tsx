import React, { FC, useEffect } from 'react';

{
  /* <script src="https://public.flourish.studio/resources/embed.js"></script> */
}

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
      data-src='visualisation/11069148'
    ></div>
  );
};

export default FlourishChart;
