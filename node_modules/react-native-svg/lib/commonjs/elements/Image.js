"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _extractViewBox = require("../lib/extract/extractViewBox");
var _extractProps = require("../lib/extract/extractProps");
var _Shape = _interopRequireDefault(require("./Shape"));
var _ImageNativeComponent = _interopRequireDefault(require("../fabric/ImageNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const spacesRegExp = /\s+/;
class SvgImage extends _Shape.default {
  static displayName = 'Image';
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    preserveAspectRatio: 'xMidYMid meet'
  };
  render() {
    const {
      props
    } = this;
    const {
      preserveAspectRatio,
      x,
      y,
      width,
      height,
      xlinkHref,
      href = xlinkHref
    } = props;
    const modes = preserveAspectRatio ? preserveAspectRatio.trim().split(spacesRegExp) : [];
    const align = modes[0];
    const meetOrSlice = modes[1];
    const stringifiedImageProps = (0, _extractProps.stringifyPropsForFabric)({
      x,
      y,
      width,
      height
    });
    const imageProps = {
      ...stringifiedImageProps,
      meetOrSlice: _extractViewBox.meetOrSliceTypes[meetOrSlice] || 0,
      align: _extractViewBox.alignEnum[align] || 'xMidYMid',
      src: !href ? null : _reactNative.Image.resolveAssetSource(typeof href === 'string' ? {
        uri: href
      } : href)
    };
    return /*#__PURE__*/_react.default.createElement(_ImageNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractProps.withoutXY)(this, props), imageProps));
  }
}
exports.default = SvgImage;
//# sourceMappingURL=Image.js.map