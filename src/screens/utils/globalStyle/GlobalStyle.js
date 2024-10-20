import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const GOLDEN_RATIO = 1.618;
const FONT = 3;
const BORDER = 5.5;
export const GlobalStyle = {
  title: responsiveFontSize(FONT),
  subtitle: responsiveFontSize(FONT / GOLDEN_RATIO),
  subtitleBig: responsiveFontSize(FONT / GOLDEN_RATIO) * 1.25,
  infoBig: responsiveFontSize(FONT / GOLDEN_RATIO / GOLDEN_RATIO) * 1.25,
  info: responsiveFontSize(FONT / GOLDEN_RATIO / GOLDEN_RATIO),
  border: responsiveHeight(BORDER),
  mediumBorder: responsiveHeight(BORDER/2),
  smallBorder: responsiveHeight(BORDER/3),
  extraSmallBorder: responsiveHeight(BORDER/5),
};
