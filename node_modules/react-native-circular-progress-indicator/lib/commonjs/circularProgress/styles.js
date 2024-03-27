"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const styles = props => {
  var _props$progressValueS, _props$progressValueS2, _props$titleStyle, _props$titleStyle2, _props$subtitleStyle, _props$subtitleStyle2;

  return _reactNative.StyleSheet.create({
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
    valueContainerRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    rotatingContainer: {
      transform: [{
        rotate: `${props.rotation}deg`
      }]
    },
    fromProps: {
      fontSize: props.progressValueFontSize || ((_props$progressValueS = props.progressValueStyle) === null || _props$progressValueS === void 0 ? void 0 : _props$progressValueS.fontSize) || props.radius / 2,
      color: props.progressValueColor || ((_props$progressValueS2 = props.progressValueStyle) === null || _props$progressValueS2 === void 0 ? void 0 : _props$progressValueS2.color) || props.activeStrokeColor
    },
    input: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    title: {
      textAlign: 'center',
      width: '70%',
      marginTop: props.showProgressValue ? props.radius * 0.05 : 0,
      color: props.titleColor || ((_props$titleStyle = props.titleStyle) === null || _props$titleStyle === void 0 ? void 0 : _props$titleStyle.color) || props.activeStrokeColor,
      fontSize: props.titleFontSize || ((_props$titleStyle2 = props.titleStyle) === null || _props$titleStyle2 === void 0 ? void 0 : _props$titleStyle2.fontSize) || props.radius / 4
    },
    subtitle: {
      color: props.subtitleColor || ((_props$subtitleStyle = props.subtitleStyle) === null || _props$subtitleStyle === void 0 ? void 0 : _props$subtitleStyle.color) || props.activeStrokeColor,
      fontSize: props.subtitleFontSize || ((_props$subtitleStyle2 = props.subtitleStyle) === null || _props$subtitleStyle2 === void 0 ? void 0 : _props$subtitleStyle2.fontSize) || props.radius / 5
    }
  });
};

var _default = styles;
exports.default = _default;
//# sourceMappingURL=styles.js.map