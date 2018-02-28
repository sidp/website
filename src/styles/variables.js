import styled, { keyframes } from 'styled-components';
import color from 'css-color-function';

export const textColor = '#221A2A';
export const linkColor = '#0099FF';
export const linkColorHover = '#0077C7';
export const linkColorActive = '#00395F';
export const focusColor = linkColor;
export const accentColor = '#F0E8F0';
export const grayedColor = '#968796';
export const grayedColorHover = color.convert(
	`color(${grayedColor} shade(20%))`
);
export const grayedColorActive = color.convert(
	`color(${grayedColor} shade(60%))`
);

export const sansSerifFontFamily = 'Source Sans Pro';
export const serifFontFamily = 'Source Serif Pro';

export const contentWidth = '36rem';
export const metaFontSize = '0.8rem';
export const metaFontFamily = sansSerifFontFamily;

export const imageBoxShadow = `rgba(0, 0, 0, 0.16) 0 4px 48px -6px,
					rgba(0, 0, 0, 0.04) 0 0 2px,
					rgba(0, 0, 0, 0.03) 0 0 0 1px`;
export const linkBoxShadow = '0 1px 0';

export const cubicBezierFadeIn = 'cubic-bezier(0.32, 0.89, 0.55, 1.0)';

export const fadeIn = keyframes`{
	  0% { opacity: 0; }
	100% { opacity: 1; }
}`;
