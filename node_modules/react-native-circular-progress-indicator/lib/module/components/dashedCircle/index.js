import React, { useMemo } from 'react';
import { Circle, Defs, Mask } from 'react-native-svg';
import COLORS from '../../utils/colors';

const DashedCircle = _ref => {
  let {
    dashedStrokeConfig = {
      count: 0,
      width: 0
    },
    circleCircumference,
    inActiveStrokeWidth,
    activeStrokeWidth,
    inactiveCircleRadius,
    activeCircleRadius
  } = _ref;
  const strokeDashArray = useMemo(() => {
    const totalDashSpace = dashedStrokeConfig.width * dashedStrokeConfig.count;
    const dashGap = (circleCircumference - totalDashSpace) / dashedStrokeConfig.count;
    return `${dashedStrokeConfig.width} ${dashGap}`;
  }, [circleCircumference, dashedStrokeConfig]);
  const strokeWidth = useMemo(() => Math.max(inActiveStrokeWidth, activeStrokeWidth), [inActiveStrokeWidth, activeStrokeWidth]);
  const radius = useMemo(() => Math.max(inactiveCircleRadius, activeCircleRadius), [inactiveCircleRadius, activeCircleRadius]);

  if ((dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.count) > 0 && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.width) > 0) {
    return /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(Mask, {
      id: "dashed-circle"
    }, /*#__PURE__*/React.createElement(Circle, {
      cx: "50%",
      cy: "50%",
      stroke: COLORS.WHITE,
      fill: COLORS.TRANSPARENT,
      strokeWidth: strokeWidth,
      r: radius,
      strokeOpacity: 1,
      strokeDasharray: strokeDashArray
    })));
  }

  return null;
};

export default /*#__PURE__*/React.memo(DashedCircle);
//# sourceMappingURL=index.js.map