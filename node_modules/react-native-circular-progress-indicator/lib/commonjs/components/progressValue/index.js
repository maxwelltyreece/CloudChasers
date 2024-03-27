"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _colors = _interopRequireDefault(require("../../utils/colors"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// implementation reference from
// https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx
// and https://github.com/coinjar/react-native-wagmi-charts/
// blob/master/src/components/AnimatedText.tsx for web compatibility
_reactNativeReanimated.default.addWhitelistedNativeProps({
  text: true
});

const AnimatedInput = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.TextInput);

const ProgressValue = _ref => {
  let {
    initialValue = 0,
    radius = 60,
    activeStrokeColor = _colors.default.GREEN,
    progressValueColor,
    progressValueStyle = {},
    progressValueFontSize,
    progressValue,
    animatedTextProps,
    allowFontScaling = true
  } = _ref;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = (0, _react.useRef)(null);

  if (_reactNative.Platform.OS === 'web') {
    // only run the reaction on web platform.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _reactNativeReanimated.useAnimatedReaction)(() => {
      return progressValue.value;
    }, (data, prevData) => {
      if (data !== prevData && inputRef.current) {
        inputRef.current.value = data;
      }
    });
  }

  const styleProps = (0, _react.useMemo)(() => ({
    radius,
    progressValueColor,
    progressValueFontSize,
    progressValueStyle,
    activeStrokeColor
  }), [radius, progressValueColor, progressValueFontSize, progressValueStyle, activeStrokeColor]);
  return /*#__PURE__*/_react.default.createElement(AnimatedInput, {
    testID: "progress-value-text",
    ref: inputRef,
    underlineColorAndroid: _colors.default.TRANSPARENT,
    editable: false,
    defaultValue: `${initialValue}`,
    style: [(0, _styles.default)(styleProps).input, progressValueStyle, (0, _styles.default)(styleProps).fromProps],
    animatedProps: animatedTextProps,
    allowFontScaling: allowFontScaling
  });
};

var _default = ProgressValue;
exports.default = _default;
//# sourceMappingURL=index.js.map