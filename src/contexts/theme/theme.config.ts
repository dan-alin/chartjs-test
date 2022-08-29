import { Color } from 'src/models/color.model';
import { Theme, ThemeType } from './theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  light: {
    '--primary': Color.GREEN,
    '--secondary': Color.DARK_GREEN,
    '--background': Color.LIGHT_GRAY,
    '--text': Color.LIGHT_GRAY,
    '--white': Color.WHITE,
  },
  dark: {
    '--primary': Color.DARK_GREEN,
    '--secondary': Color.GREEN,
    '--background': Color.DARK_GRAY,
    '--text': Color.LIGHT_GRAY,
    '--white': Color.WHITE,
  },
};
