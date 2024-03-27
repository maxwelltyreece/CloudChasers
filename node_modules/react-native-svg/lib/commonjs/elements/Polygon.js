"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Path = _interopRequireDefault(require("./Path"));
var _Shape = _interopRequireDefault(require("./Shape"));
var _extractPolyPoints = _interopRequireDefault(require("../lib/extract/extractPolyPoints"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Polygon extends _Shape.default {
  static displayName = 'Polygon';
  static defaultProps = {
    points: ''
  };
  setNativeProps = props => {
    const {
      points
    } = props;
    if (points) {
      props.d = `M${(0, _extractPolyPoints.default)(points)}z`;
    }
    this.root && this.root.setNativeProps(props);
  };
  render() {
    const {
      props
    } = this;
    const {
      points
    } = props;
    return /*#__PURE__*/_react.default.createElement(_Path.default, _extends({
      ref: this.refMethod,
      d: points && `M${(0, _extractPolyPoints.default)(points)}z`
    }, props));
  }
}
exports.default = Polygon;
//# sourceMappingURL=Polygon.js.map