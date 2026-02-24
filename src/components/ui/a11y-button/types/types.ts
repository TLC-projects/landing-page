export type ContrastType =
  | 'high-contrast'
  | 'grayscale'
  | 'invert-colors'
  | 'yellow-on-black'
  | 'red-on-white'
  | 'green-on-blue'
  | 'yellow-on-blue'
  | 'white-on-black'
  | 'no-contrast';

export type BasicValuesType = '1' | '2' | '3' | 'none';

export type ConfigA11y = {
  fontSize: BasicValuesType;
  contrast: ContrastType;
  lineHeight: BasicValuesType;
  letterSpacing: BasicValuesType;
  darkMode: boolean;
  audio: boolean;
  interpreter: boolean;
};


export type TabType = 'main' | 'contrast' | 'fontSize' | 'lineHeight' | 'letterSpacing';