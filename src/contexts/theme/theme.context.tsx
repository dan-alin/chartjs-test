import React, {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { THEMES } from './theme.config';
import { Theme, ThemeType } from './theme.model';

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: 'light',
  theme: THEMES['light'],
} as ThemeContextProps);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
