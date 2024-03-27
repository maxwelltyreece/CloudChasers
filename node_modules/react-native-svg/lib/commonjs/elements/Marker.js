"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractViewBox = _interopRequireDefault(require("../lib/extract/extractViewBox"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _MarkerNativeComponent = _interopRequireDefault(require("../fabric/MarkerNativeComponent"));
var _extractProps = require("../lib/extract/extractProps");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Marker extends _Shape.default {
  static displayName = 'Marker';
  static defaultProps = {
    refX: 0,
    refY: 0,
    orient: '0',
    markerWidth: 3,
    markerHeight: 3,
    markerUnits: 'strokeWidth'
  };
  render() {
    const {
      props
    } = this;
    const {
      id,
      viewBox,
      preserveAspectRatio,
      refX,
      refY,
      markerUnits,
      orient,
      markerWidth,
      markerHeight,
      children
    } = props;
    const markerProps = (0, _extractProps.stringifyPropsForFabric)({
      name: id,
      refX,
      refY,
      markerUnits,
      orient: String(orient),
      markerWidth,
      markerHeight
    });
    return /*#__PURE__*/_react.default.createElement(_MarkerNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, markerProps, (0, _extractViewBox.default)({
      viewBox,
      preserveAspectRatio
    })), children);
  }
}
exports.default = Marker;
//# sourceMappingURL=Marker.js.map