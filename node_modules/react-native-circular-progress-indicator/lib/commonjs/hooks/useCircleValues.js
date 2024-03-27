"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCircleValues;

var _react = require("react");

function useCircleValues(_ref) {
  let {
    radius,
    activeStrokeWidth,
    inActiveStrokeWidth
  } = _ref;
  const isSameStrokeWidth = (0, _react.useMemo)(() => activeStrokeWidth === inActiveStrokeWidth, [activeStrokeWidth, inActiveStrokeWidth]);
  const isActiveStrokeBigger = (0, _react.useMemo)(() => {
    return activeStrokeWidth > inActiveStrokeWidth;
  }, [activeStrokeWidth, inActiveStrokeWidth]);
  const findRadius = (0, _react.useCallback)(() => {
    if (isSameStrokeWidth) {
      return radius + inActiveStrokeWidth / 2;
    }

    if (isActiveStrokeBigger) {
      return radius + activeStrokeWidth / 2;
    }

    return radius + inActiveStrokeWidth / 2;
  }, [isSameStrokeWidth, isActiveStrokeBigger, radius, inActiveStrokeWidth, activeStrokeWidth]);
  const inactiveCircleRadius = (0, _react.useMemo)(() => findRadius(), [findRadius]);
  const activeCircleRadius = (0, _react.useMemo)(() => findRadius(), [findRadius]);
  const circleCircumference = (0, _react.useMemo)(() => 2 * Math.PI * activeCircleRadius, [activeCircleRadius]);
  return {
    inactiveCircleRadius,
    activeCircleRadius,
    circleCircumference
  };
}
//# sourceMappingURL=useCircleValues.js.map