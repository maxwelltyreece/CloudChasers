"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _Shape = _interopRequireDefault(require("./Shape"));
var _EllipseNativeComponent = _interopRequireDefault(require("../fabric/EllipseNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Ellipse extends _Shape.default {
  static displayName = 'Ellipse';
  static defaultProps = {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0
  };
  render() {
    const {
      props
    } = this;
    const {
      cx,
      cy,
      rx,
      ry
    } = props;
    const ellipseProps = {
      ...(0, _extractProps.extract)(this, props),
      ...(0, _extractProps.stringifyPropsForFabric)({
        cx,
        cy,
        rx,
        ry
      })
    };
    return /*#__PURE__*/_react.default.createElement(_EllipseNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, ellipseProps));
  }
}
exports.default = Ellipse;
//# sourceMappingURL=Ellipse.js.map