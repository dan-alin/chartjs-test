import * as d3 from 'd3';
import { useEffect, useState } from 'react';

type MapData = {
  data: unknown;
  loading: boolean;
};
const useMapTools = () => {
  const [mapData, setMapData] = useState<MapData>({
    data: {},
    loading: true,
  });

  useEffect(() => {
    d3.json('https://xihai01.github.io/friendly-journey/map_data.geojson')
      .then((data) => {
        setMapData((prevState) => {
          return { ...prevState, data: data, loading: false };
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);
  return { mapData };
};

export default useMapTools;
