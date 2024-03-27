"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _Shape = _interopRequireDefault(require("./Shape"));
var _RectNativeComponent = _interopRequireDefault(require("../fabric/RectNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Rect extends _Shape.default {
  static displayName = 'Rect';
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  render() {
    const {
      props
    } = this;
    const {
      x,
      y,
      width,
      height,
      rx,
      ry
    } = props;
    const rectProps = (0, _extractProps.stringifyPropsForFabric)({
      x,
      y,
      width,
      height,
      rx,
      ry
    });
    return /*#__PURE__*/_react.default.createElement(_RectNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractProps.withoutXY)(this, props), rectProps));
  }
}
exports.default = Rect;
//# sourceMappingURL=Rect.js.map