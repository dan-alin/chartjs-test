import { Color } from 'src/models/color.model';
import { Theme, ThemeType } from './theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.BLUE,
    '--secondary': Color.DARK_BLUE,
    '--background': Color.WHITE,
    '--text': Color.DARK_GRAY,
    '--white': Color.WHITE,
  },
  dark: {
    '--primary': Color.DARK_BLUE,
    '--secondary': Color.BLUE,
    '--background': Color.DARK_GRAY,
    '--text': Color.LIGHT_GRAY,
    '--white': Color.WHITE,
  },
};
