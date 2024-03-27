"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _Shape = _interopRequireDefault(require("./Shape"));
var _PathNativeComponent = _interopRequireDefault(require("../fabric/PathNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Path extends _Shape.default {
  static displayName = 'Path';
  render() {
    const {
      props
    } = this;
    const {
      d
    } = props;
    const pathProps = {
      ...(0, _extractProps.extract)(this, props),
      d
    };
    return /*#__PURE__*/_react.default.createElement(_PathNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, pathProps));
  }
}
exports.default = Path;
//# sourceMappingURL=Path.js.map