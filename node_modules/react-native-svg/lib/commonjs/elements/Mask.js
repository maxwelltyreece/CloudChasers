"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _units = _interopRequireDefault(require("../lib/units"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _MaskNativeComponent = _interopRequireDefault(require("../fabric/MaskNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Mask extends _Shape.default {
  static displayName = 'Mask';
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
      maskUnits,
      maskContentUnits,
      children
    } = props;
    const strigifiedMaskProps = (0, _extractProps.stringifyPropsForFabric)({
      x,
      y,
      width,
      height
    });
    const maskProps = {
      maskUnits: maskUnits !== undefined ? _units.default[maskUnits] : 0,
      maskContentUnits: maskContentUnits !== undefined ? _units.default[maskContentUnits] : 1
    };
    return /*#__PURE__*/_react.default.createElement(_MaskNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractProps.withoutXY)(this, props), strigifiedMaskProps, maskProps), children);
  }
}
exports.default = Mask;
//# sourceMappingURL=Mask.js.map