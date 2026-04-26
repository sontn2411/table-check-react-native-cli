import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard iPhone 11/12/13/14 screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => {
  'worklet';
  return (width / guidelineBaseWidth) * size;
};
const verticalScale = (size: number) => {
  'worklet';
  return (height / guidelineBaseHeight) * size;
};
const moderateScale = (size: number, factor = 0.5) => {
  'worklet';
  return size + (scale(size) - size) * factor;
};

export { scale, verticalScale, moderateScale };
