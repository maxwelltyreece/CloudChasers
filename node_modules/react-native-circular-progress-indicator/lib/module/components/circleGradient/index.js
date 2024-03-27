import React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const CircleGradient = _ref => {
  let {
    activeStrokeSecondaryColor,
    activeStrokeColor
  } = _ref;

  if (activeStrokeSecondaryColor) {
    return /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(LinearGradient, {
      id: "grad",
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%"
    }, /*#__PURE__*/React.createElement(Stop, {
      offset: "0%",
      stopColor: activeStrokeSecondaryColor
    }), /*#__PURE__*/React.createElement(Stop, {
      offset: "100%",
      stopColor: activeStrokeColor
    })));
  }

  return null;
};

export default /*#__PURE__*/React.memo(CircleGradient);
//# sourceMappingURL=index.js.map