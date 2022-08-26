import { Color } from 'src/models/color.model';

export type ThemeType = 'dark' | 'light';

export interface Theme {
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--text': Color;
  '--white': Color;
}
