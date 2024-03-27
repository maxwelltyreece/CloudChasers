"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractTransform = _interopRequireDefault(require("../lib/extract/extractTransform"));
var _extractViewBox = _interopRequireDefault(require("../lib/extract/extractViewBox"));
var _units = _interopRequireDefault(require("../lib/units"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _PatternNativeComponent = _interopRequireDefault(require("../fabric/PatternNativeComponent"));
var _extractProps = require("../lib/extract/extractProps");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Pattern extends _Shape.default {
  static displayName = 'Pattern';
  static defaultProps = {
    x: '0%',
    y: '0%',
    width: '100%',
    height: '100%'
  };
  render() {
    const {
      props
    } = this;
    const {
      patternTransform,
      transform,
      id,
      x,
      y,
      width,
      height,
      patternUnits,
      patternContentUnits,
      children,
      viewBox,
      preserveAspectRatio
    } = props;
    const matrix = (0, _extractTransform.default)(patternTransform || transform || props);
    const strigifiedPatternProps = (0, _extractProps.stringifyPropsForFabric)({
      x,
      y,
      width,
      height
    });
    const patternProps = {
      name: id,
      matrix,
      patternTransform: matrix,
      patternUnits: patternUnits && _units.default[patternUnits] || 0,
      patternContentUnits: patternContentUnits ? _units.default[patternContentUnits] : 1
    };
    return /*#__PURE__*/_react.default.createElement(_PatternNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, strigifiedPatternProps, patternProps, (0, _extractViewBox.default)({
      viewBox,
      preserveAspectRatio
    })), children);
  }
}
exports.default = Pattern;
//# sourceMappingURL=Pattern.js.map