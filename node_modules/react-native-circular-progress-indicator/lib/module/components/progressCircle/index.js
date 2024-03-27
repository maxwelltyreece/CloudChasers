import React, { useMemo } from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import useCircleValues from '../../hooks/useCircleValues';
import COLORS from '../../utils/colors';
import CircleGradient from '../circleGradient';
import DashedCircle from '../dashedCircle';
import styles from './styles';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = _ref => {
  let {
    circleBackgroundColor = COLORS.TRANSPARENT,
    radius = 60,
    strokeLinecap = 'round',
    activeStrokeColor = COLORS.GREEN,
    activeStrokeSecondaryColor = null,
    activeStrokeWidth = 10,
    inActiveStrokeColor = COLORS.BLACK_30,
    inActiveStrokeWidth = 10,
    inActiveStrokeOpacity = 1,
    dashedStrokeConfig,
    animatedCircleProps
  } = _ref;
  const viewBox = useMemo(() => radius + Math.max(activeStrokeWidth, inActiveStrokeWidth), [radius, activeStrokeWidth, inActiveStrokeWidth]);
  const {
    inactiveCircleRadius,
    activeCircleRadius,
    circleCircumference
  } = useCircleValues({
    radius,
    activeStrokeWidth,
    inActiveStrokeWidth
  });
  const maskId = useMemo(() => dashedStrokeConfig && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.count) > 0 && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.width) > 0 ? 'url(#dashed-circle)' : undefined, [dashedStrokeConfig]);
  const strokeColor = useMemo(() => activeStrokeSecondaryColor ? 'url(#grad)' : activeStrokeColor, [activeStrokeSecondaryColor, activeStrokeColor]);
  return /*#__PURE__*/React.createElement(Svg, {
    testID: "progress-circle",
    width: radius * 2,
    height: radius * 2,
    viewBox: `0 0 ${viewBox * 2} ${viewBox * 2}`,
    style: styles.svg
  }, /*#__PURE__*/React.createElement(CircleGradient, {
    activeStrokeColor: activeStrokeColor,
    activeStrokeSecondaryColor: activeStrokeSecondaryColor
  }), /*#__PURE__*/React.createElement(DashedCircle, {
    circleCircumference: circleCircumference,
    inActiveStrokeWidth: inActiveStrokeWidth,
    activeStrokeWidth: activeStrokeWidth,
    inactiveCircleRadius: inactiveCircleRadius,
    activeCircleRadius: activeCircleRadius,
    dashedStrokeConfig: dashedStrokeConfig
  }), /*#__PURE__*/React.createElement(G, {
    mask: maskId
  }, /*#__PURE__*/React.createElement(Circle, {
    cx: "50%",
    cy: "50%",
    stroke: inActiveStrokeColor,
    strokeWidth: inActiveStrokeWidth,
    r: inactiveCircleRadius,
    fill: circleBackgroundColor,
    strokeOpacity: inActiveStrokeOpacity
  }), /*#__PURE__*/React.createElement(AnimatedCircle, {
    cx: "50%",
    cy: "50%",
    stroke: strokeColor,
    strokeWidth: activeStrokeWidth,
    r: activeCircleRadius,
    fill: COLORS.TRANSPARENT,
    strokeDasharray: circleCircumference,
    strokeLinecap: strokeLinecap,
    animatedProps: animatedCircleProps
  })));
};

export default ProgressCircle;
//# sourceMappingURL=index.js.map