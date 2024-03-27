"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const styles = props => _reactNative.StyleSheet.create({
  container: {
    width: props.radius * 2,
    height: props.radius * 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rotatingContainer: {
    transform: [{
      rotate: `${props.rotation}deg`
    }]
  }
});

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map