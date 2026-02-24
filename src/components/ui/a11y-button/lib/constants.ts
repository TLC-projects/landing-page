import type { ConfigA11y } from '../types/types';

export const CONTRAST = {
  highContrast: 'high-contrast',
  grayScale: 'grayscale',
  invertColors: 'invert-colors',
  yellowOnBlack: 'yellow-on-black',
  redOnWhite: 'red-on-white',
  greenOnBlue: 'green-on-blue',
  yellowOnBlue: 'yellow-on-blue',
  whiteOnBlack: 'white-on-black',
  noContrast: 'no-contrast'
} as const;

export const INITIAL_STATE: ConfigA11y = {
  fontSize: '1',
  contrast: 'no-contrast',
  lineHeight: 'none',
  letterSpacing: 'none',
  darkMode: false,
  stopAnimations: false
};

export const BASIC_VALUES = {
  '1': '1',
  '2': '2',
  '3': '3',
  none: 'none'
} as const;

export const INVALID_VALUES = ['no-contrast', 'none', false];

export const i18n = {
  title: 'Accesibilidad',
  darkMode: 'Modo oscuro',
  stopAnimations: 'Detener animaciones',
  contrast: 'Ajuste del contraste',
  contrastTitle: 'Contraste personalizado',
  grayScale: 'Escala de grises',
  highContrast: 'Alto contraste',
  invertColors: 'Invertir colores',
  yellowOnBlack: 'Amarillo con negro',
  redOnWhite: 'Blanco con rojo',
  greenOnBlue: 'Verde con azul',
  yellowOnBlue: 'Amarillo con azul',
  whiteOnBlack: 'Blanco con negro',
  fontSize: 'Tamaño de fuente',
  fontSizeSmall: 'Pequeño',
  fontSizeMid: 'Mediano',
  fontSizeBig: 'Grande',
  lineHeight: 'Altura de línea',
  lineHeightSmall: 'Altura 1.5x',
  lineHeightMid: 'Altura 1.75x',
  lineHeightBig: 'Altura 2x',
  letterSpacing: 'Espaciado de texto',
  letterSpacingSmall: 'Ligero',
  letterSpacingMid: 'Medio',
  letterSpacingBig: 'Grande'
};
