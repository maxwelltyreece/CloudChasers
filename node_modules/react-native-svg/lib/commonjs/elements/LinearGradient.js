"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractGradient = _interopRequireDefault(require("../lib/extract/extractGradient"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _LinearGradientNativeComponent = _interopRequireDefault(require("../fabric/LinearGradientNativeComponent"));
var _extractProps = require("../lib/extract/extractProps");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class LinearGradient extends _Shape.default {
  static displayName = 'LinearGradient';
  static defaultProps = {
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%'
  };
  render() {
    const {
      props
    } = this;
    const {
      x1,
      y1,
      x2,
      y2
    } = props;
    const linearGradientProps = (0, _extractProps.stringifyPropsForFabric)({
      x1,
      y1,
      x2,
      y2
    });
    return /*#__PURE__*/_react.default.createElement(_LinearGradientNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, linearGradientProps, (0, _extractGradient.default)(props, this)));
  }
}
exports.default = LinearGradient;
//# sourceMappingURL=LinearGradient.js.map