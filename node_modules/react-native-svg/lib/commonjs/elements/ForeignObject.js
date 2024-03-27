"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _G = _interopRequireDefault(require("./G"));
var _ForeignObjectNativeComponent = _interopRequireDefault(require("../fabric/ForeignObjectNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class ForeignObject extends _G.default {
  static displayName = 'ForeignObject';
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
      x,
      y,
      width,
      height,
      children
    } = props;
    const foreignObjectProps = (0, _extractProps.stringifyPropsForFabric)({
      x,
      y,
      width,
      height
    });
    return /*#__PURE__*/_react.default.createElement(_ForeignObjectNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractProps.withoutXY)(this, props), foreignObjectProps), children);
  }
}
exports.default = ForeignObject;
//# sourceMappingURL=ForeignObject.js.map