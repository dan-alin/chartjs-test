import { useState, useEffect } from 'react';

export type WindowSize = {
  width: number;
  height: number;
};

export default function useWindowSize(
  checkResize = false,
  verticalPadding = 0,
  horizontalPadding = 0
) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth - horizontalPadding,
        height: window.innerHeight - verticalPadding,
      });
    }

    if (checkResize) {
      window.addEventListener('resize', handleResize);
    }

    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
