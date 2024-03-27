"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeSvg = require("react-native-svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CircleGradient = _ref => {
  let {
    activeStrokeSecondaryColor,
    activeStrokeColor
  } = _ref;

  if (activeStrokeSecondaryColor) {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "grad",
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%"
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
      offset: "0%",
      stopColor: activeStrokeSecondaryColor
    }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
      offset: "100%",
      stopColor: activeStrokeColor
    })));
  }

  return null;
};

var _default = /*#__PURE__*/_react.default.memo(CircleGradient);

exports.default = _default;
//# sourceMappingURL=index.js.map