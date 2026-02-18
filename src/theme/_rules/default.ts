import type { Rule } from 'unocss';

import type { Theme } from '../types/types';

import { fontSize } from './font';
import { gap, margin, padding } from './spacing';
import { fontStyles, fontWeight, textAlignment, textTransforms, textWraps } from './static';
import {
  display,
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,
  flex,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  gridTemplateColumns,
  gridTemplateRows,
  gridColumn,
  gridRow,
  gridAutoFlow,
  placeContent,
  placeItems,
  placeSelf
} from './layout';
import {
  textColor,
  backgroundColor,
  borderColor,
  staticColorUtilities
} from './colors';
import {
  boxShadow,
  shadowEffects,
  dropShadow
} from './shadows';
import {
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight
} from './sizing';
import {
  borderWidth,
  borderRadius,
  borderStyle,
  outline
} from './borders';
import {
  position,
  inset,
  top,
  right,
  bottom,
  left,
  zIndex
} from './position';
import {
  overflow,
  overflowX,
  overflowY,
  overscrollBehavior,
  scrollBehavior,
  scrollSnap
} from './overflow';
import {
  cursor,
  userSelect,
  pointerEvents,
  resize,
  touchAction,
  appearance,
  caretColor,
  accentColor,
  willChange
} from './interactivity';
import {
  lineHeight,
  letterSpacing,
  wordSpacing,
  textDecoration,
  textIndent,
  whitespace,
  wordBreak,
  hyphens,
  textOverflow,
  verticalAlign,
  listStyle
} from './typography';
import {
  visibility,
  aspectRatio,
  objectFit,
  objectPosition,
  isolation,
  mixBlendMode,
  backgroundBlendMode,
  filter,
  backdropFilter,
  boxSizing,
  float,
  clear,
  tableLayout,
  borderCollapse,
  borderSpacing,
  breakAfter,
  breakBefore,
  breakInside
} from './misc';

export const rules: Rule<Theme>[] = [
  // Spacing
  padding,
  margin,
  gap,
  
  // Typography - Basic
  fontSize,
  fontStyles,
  fontWeight,
  textWraps,
  textTransforms,
  textAlignment,
  
  // Typography - Advanced
  lineHeight,
  letterSpacing,
  wordSpacing,
  textDecoration,
  textIndent,
  whitespace,
  wordBreak,
  hyphens,
  textOverflow,
  verticalAlign,
  listStyle,
  
  // Layout - Display
  display,
  
  // Layout - Flexbox
  flexDirection,
  flexWrap,
  flexGrow,
  flexShrink,
  flex,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  
  // Layout - Grid
  gridTemplateColumns,
  gridTemplateRows,
  gridColumn,
  gridRow,
  gridAutoFlow,
  placeContent,
  placeItems,
  placeSelf,
  
  // Sizing
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  
  // Position
  position,
  inset,
  top,
  right,
  bottom,
  left,
  zIndex,
  
  // Colors
  textColor,
  backgroundColor,
  borderColor,
  staticColorUtilities,
  
  // Borders
  borderWidth,
  borderRadius,
  borderStyle,
  outline,
  
  // Shadows
  boxShadow,
  shadowEffects,
  dropShadow,
  
  // Overflow & Scroll
  overflow,
  overflowX,
  overflowY,
  overscrollBehavior,
  scrollBehavior,
  scrollSnap,
  
  // Interactivity
  cursor,
  userSelect,
  pointerEvents,
  resize,
  touchAction,
  appearance,
  caretColor,
  accentColor,
  willChange,
  
  // Misc
  visibility,
  aspectRatio,
  objectFit,
  objectPosition,
  isolation,
  mixBlendMode,
  backgroundBlendMode,
  filter,
  backdropFilter,
  boxSizing,
  float,
  clear,
  tableLayout,
  borderCollapse,
  borderSpacing,
  breakAfter,
  breakBefore,
  breakInside
].flat(1);
