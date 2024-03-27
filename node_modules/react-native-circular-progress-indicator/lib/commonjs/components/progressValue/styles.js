"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const styles = props => {
  var _props$progressValueS, _props$progressValueS2;

  return _reactNative.StyleSheet.create({
    fromProps: {
      fontSize: props.progressValueFontSize || ((_props$progressValueS = props.progressValueStyle) === null || _props$progressValueS === void 0 ? void 0 : _props$progressValueS.fontSize) || props.radius / 2,
      color: props.progressValueColor || ((_props$progressValueS2 = props.progressValueStyle) === null || _props$progressValueS2 === void 0 ? void 0 : _props$progressValueS2.color) || props.activeStrokeColor
    },
    input: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 0
    }
  });
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map