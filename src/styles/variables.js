import { keyframes } from 'styled-components';
import Color from 'color';

export const textColor = '#221A2A';
export const linkColor = '#0099FF';
export const linkColorHover = '#0077C7';
export const linkColorActive = '#00395F';
export const focusColor = linkColor;
export const accentColor = '#F0DFEC';
export const grayedColor = '#968796';
export const grayedColorHover = Color(grayedColor)
	.darken(0.2)
	.toString();
export const grayedColorActive = Color(grayedColor)
	.darken(0.6)
	.toString();

export const paleAccentColor = Color(accentColor)
	.lighten(0.075)
	.toString();

export const sansSerifFontFamily = 'Source Sans Pro';
export const serifFontFamily = 'Source Serif Pro';
export const monoFontFamily = 'Source Code Pro';

export const contentWidth = '36rem';
export const metaFontSize = '0.8rem';
export const metaFontFamily = sansSerifFontFamily;

export const imageBoxShadow = `var(--image-shadow) 0 4px 48px -6px,
	var(--image-frame) 0 0 0 1px`;
export const linkBoxShadow = '0 1px 0';

export const cubicBezierFadeIn = 'cubic-bezier(0.32, 0.89, 0.55, 1.0)';

export const fadeIn = keyframes`{
	  0% { opacity: 0; }
	100% { opacity: 1; }
}`;
