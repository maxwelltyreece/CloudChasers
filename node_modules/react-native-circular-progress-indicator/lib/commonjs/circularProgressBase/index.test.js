"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('render circular progress base', () => {
  it('should render progress with minimum items', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50
    }));
    expect(queryByTestId('progress-bar')).toBeDefined();
    expect(queryByTestId('progress-circle')).toBeDefined();
  });
  it('should call onAnimationComplete function', async () => {
    const onAnimationCompleted = jest.fn();
    (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      duration: 1500,
      onAnimationComplete: onAnimationCompleted
    }));
    expect(onAnimationCompleted).toHaveBeenCalledTimes(1);
  });
});
//# sourceMappingURL=index.test.js.map