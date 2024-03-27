"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractViewBox = _interopRequireDefault(require("../lib/extract/extractViewBox"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _SymbolNativeComponent = _interopRequireDefault(require("../fabric/SymbolNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Symbol extends _Shape.default {
  static displayName = 'Symbol';
  render() {
    const {
      props
    } = this;
    const {
      id,
      children
    } = props;
    const symbolProps = {
      name: id
    };
    return /*#__PURE__*/_react.default.createElement(_SymbolNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, symbolProps, (0, _extractViewBox.default)(props)), children);
  }
}
exports.default = Symbol;
//# sourceMappingURL=Symbol.js.map