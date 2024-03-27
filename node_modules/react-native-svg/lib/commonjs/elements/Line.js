"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _Shape = _interopRequireDefault(require("./Shape"));
var _LineNativeComponent = _interopRequireDefault(require("../fabric/LineNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Line extends _Shape.default {
  static displayName = 'Line';
  static defaultProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
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
    const lineProps = {
      ...(0, _extractProps.extract)(this, props),
      ...(0, _extractProps.stringifyPropsForFabric)({
        x1,
        y1,
        x2,
        y2
      })
    };
    return /*#__PURE__*/_react.default.createElement(_LineNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, lineProps));
  }
}
exports.default = Line;
//# sourceMappingURL=Line.js.map