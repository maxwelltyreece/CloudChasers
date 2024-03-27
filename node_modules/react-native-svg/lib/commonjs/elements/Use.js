"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _extractProps = require("../lib/extract/extractProps");
var _util = require("../lib/util");
var _Shape = _interopRequireDefault(require("./Shape"));
var _UseNativeComponent = _interopRequireDefault(require("../fabric/UseNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class Use extends _Shape.default {
  static displayName = 'Use';
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
      children,
      x,
      y,
      width,
      height,
      xlinkHref,
      href = xlinkHref
    } = props;
    const matched = href && href.match(_util.idPattern);
    const match = matched && matched[1];
    if (!match) {
      console.warn('Invalid `href` prop for `Use` element, expected a href like "#id", but got: "' + href + '"');
    }
    const useProps = (0, _extractProps.stringifyPropsForFabric)({
      href: match,
      x,
      y,
      width,
      height
    });
    return /*#__PURE__*/_react.default.createElement(_UseNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractProps.withoutXY)(this, props), useProps), children);
  }
}
exports.default = Use;
//# sourceMappingURL=Use.js.map