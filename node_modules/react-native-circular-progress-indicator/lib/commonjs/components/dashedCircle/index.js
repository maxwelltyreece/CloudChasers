"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _colors = _interopRequireDefault(require("../../utils/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const strokeDashArray = (0, _react.useMemo)(() => {
    const totalDashSpace = dashedStrokeConfig.width * dashedStrokeConfig.count;
    const dashGap = (circleCircumference - totalDashSpace) / dashedStrokeConfig.count;
    return `${dashedStrokeConfig.width} ${dashGap}`;
  }, [circleCircumference, dashedStrokeConfig]);
  const strokeWidth = (0, _react.useMemo)(() => Math.max(inActiveStrokeWidth, activeStrokeWidth), [inActiveStrokeWidth, activeStrokeWidth]);
  const radius = (0, _react.useMemo)(() => Math.max(inactiveCircleRadius, activeCircleRadius), [inactiveCircleRadius, activeCircleRadius]);

  if ((dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.count) > 0 && (dashedStrokeConfig === null || dashedStrokeConfig === void 0 ? void 0 : dashedStrokeConfig.width) > 0) {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Mask, {
      id: "dashed-circle"
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
      cx: "50%",
      cy: "50%",
      stroke: _colors.default.WHITE,
      fill: _colors.default.TRANSPARENT,
      strokeWidth: strokeWidth,
      r: radius,
      strokeOpacity: 1,
      strokeDasharray: strokeDashArray
    })));
  }

  return null;
};

var _default = /*#__PURE__*/_react.default.memo(DashedCircle);

exports.default = _default;
//# sourceMappingURL=index.js.map