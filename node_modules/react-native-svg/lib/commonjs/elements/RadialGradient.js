"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractGradient = _interopRequireDefault(require("../lib/extract/extractGradient"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _RadialGradientNativeComponent = _interopRequireDefault(require("../fabric/RadialGradientNativeComponent"));
var _extractProps = require("../lib/extract/extractProps");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class RadialGradient extends _Shape.default {
  static displayName = 'RadialGradient';
  static defaultProps = {
    cx: '50%',
    cy: '50%',
    r: '50%'
  };
  render() {
    const {
      props
    } = this;
    const {
      rx,
      ry,
      r,
      cx,
      cy,
      fx = cx,
      fy = cy
    } = props;
    const radialGradientProps = (0, _extractProps.stringifyPropsForFabric)({
      fx,
      fy,
      rx: rx || r,
      ry: ry || r,
      cx,
      cy
    });
    return /*#__PURE__*/_react.default.createElement(_RadialGradientNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, radialGradientProps, (0, _extractGradient.default)(props, this)));
  }
}
exports.default = RadialGradient;
//# sourceMappingURL=RadialGradient.js.map