"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _useCircleValues = _interopRequireDefault(require("../../hooks/useCircleValues"));

var _colors = _interopRequireDefault(require("../../utils/colors"));

var _circleGradient = _interopRequireDefault(require("../circleGradient"));

var _dashedCircle = _interopRequireDefault(require("../dashedCircle"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

const ProgressCircle = _ref => {
  let {
    circleBackgroundColor = _colors.default.TRANSPARENT,
    radius = 60,
    strokeLinecap = 'round',
    activeStrokeColor = _colors.default.GREEN,
    activeStrokeSecondaryColor = null,
    activeStrokeWidth = 10,
    inActiveStrokeColor = _colors.default.BLACK_30,
    inActiveStrokeWidth = 10,
    inActiveStrokeOpacity = 1,
    dashedStrokeConfig,
    animatedCircleProps
  } = _ref;
  const viewBox = (0, _react.useMemo)(() => radius + Math.max(activeStrokeWidth, inActiveStrokeWidth), [radius, activeStrokeWidth, inActiveStrokeWidth]);
  const {
    inactiveCircleRadius,
    activeCircleRadius,
    circleCircumference
  } = (0, _useCircleValues.default)({
    radius,
    activeStrokeWidth,
    inActiveStrokeWidth
  });
  const maskId = (0, _react.useMemo)(() => dashedStrokeConfig && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.count) > 0 && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.width) > 0 ? 'url(#dashed-circle)' : undefined, [dashedStrokeConfig]);
  const strokeColor = (0, _react.useMemo)(() => activeStrokeSecondaryColor ? 'url(#grad)' : activeStrokeColor, [activeStrokeSecondaryColor, activeStrokeColor]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    testID: "progress-circle",
    width: radius * 2,
    height: radius * 2,
    viewBox: `0 0 ${viewBox * 2} ${viewBox * 2}`,
    style: _styles.default.svg
  }, /*#__PURE__*/_react.default.createElement(_circleGradient.default, {
    activeStrokeColor: activeStrokeColor,
    activeStrokeSecondaryColor: activeStrokeSecondaryColor
  }), /*#__PURE__*/_react.default.createElement(_dashedCircle.default, {
    circleCircumference: circleCircumference,
    inActiveStrokeWidth: inActiveStrokeWidth,
    activeStrokeWidth: activeStrokeWidth,
    inactiveCircleRadius: inactiveCircleRadius,
    activeCircleRadius: activeCircleRadius,
    dashedStrokeConfig: dashedStrokeConfig
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.G, {
    mask: maskId
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    cx: "50%",
    cy: "50%",
    stroke: inActiveStrokeColor,
    strokeWidth: inActiveStrokeWidth,
    r: inactiveCircleRadius,
    fill: circleBackgroundColor,
    strokeOpacity: inActiveStrokeOpacity
  }), /*#__PURE__*/_react.default.createElement(AnimatedCircle, {
    cx: "50%",
    cy: "50%",
    stroke: strokeColor,
    strokeWidth: activeStrokeWidth,
    r: activeCircleRadius,
    fill: _colors.default.TRANSPARENT,
    strokeDasharray: circleCircumference,
    strokeLinecap: strokeLinecap,
    animatedProps: animatedCircleProps
  })));
};

var _default = ProgressCircle;
exports.default = _default;
//# sourceMappingURL=index.js.map