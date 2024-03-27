"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _progressCircle = _interopRequireDefault(require("../components/progressCircle"));

var _useAnimatedValue = _interopRequireDefault(require("../hooks/useAnimatedValue"));

var _colors = _interopRequireDefault(require("../utils/colors"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CircularProgressBase = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    value,
    initialValue = 0,
    circleBackgroundColor = _colors.default.TRANSPARENT,
    radius = 60,
    duration = 500,
    delay = 0,
    maxValue = 100,
    strokeLinecap = 'round',
    onAnimationComplete = () => null,
    activeStrokeColor = _colors.default.GREEN,
    activeStrokeSecondaryColor = null,
    activeStrokeWidth = 10,
    inActiveStrokeColor = _colors.default.BLACK_30,
    inActiveStrokeWidth = 10,
    inActiveStrokeOpacity = 1,
    clockwise = true,
    startInPausedState = false,
    rotation = 0,
    dashedStrokeConfig = {
      count: 0,
      width: 0
    },
    strokeColorConfig = undefined,
    children
  } = props;
  const {
    animatedCircleProps,
    play,
    pause,
    reAnimate
  } = (0, _useAnimatedValue.default)({
    initialValue,
    radius,
    maxValue,
    clockwise,
    startInPausedState,
    delay,
    value,
    duration,
    onAnimationComplete,
    activeStrokeWidth,
    inActiveStrokeWidth,
    strokeColorConfig
  });
  (0, _react.useImperativeHandle)(ref, () => ({
    play,
    pause,
    reAnimate
  }));
  const styleProps = (0, _react.useMemo)(() => ({
    radius,
    rotation
  }), [radius, rotation]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: (0, _styles.default)(styleProps).container,
    testID: "progress-bar"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: (0, _styles.default)(styleProps).rotatingContainer
  }, /*#__PURE__*/_react.default.createElement(_progressCircle.default, {
    circleBackgroundColor: circleBackgroundColor,
    radius: radius,
    strokeLinecap: strokeLinecap,
    activeStrokeColor: activeStrokeColor,
    activeStrokeSecondaryColor: activeStrokeSecondaryColor,
    activeStrokeWidth: activeStrokeWidth,
    inActiveStrokeColor: inActiveStrokeColor,
    inActiveStrokeWidth: inActiveStrokeWidth,
    inActiveStrokeOpacity: inActiveStrokeOpacity,
    animatedCircleProps: animatedCircleProps,
    dashedStrokeConfig: dashedStrokeConfig
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFillObject, (0, _styles.default)(styleProps).valueContainer]
  }, children));
});
var _default = CircularProgressBase;
exports.default = _default;
//# sourceMappingURL=index.js.map