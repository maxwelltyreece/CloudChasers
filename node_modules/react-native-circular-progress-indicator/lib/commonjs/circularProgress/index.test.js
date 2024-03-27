"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('render circular progress', () => {
  it('should render progress with minimum items', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50
    }));
    expect(queryByTestId('progress-bar')).toBeDefined();
    expect(queryByTestId('progress-circle')).toBeDefined();
    expect(queryByTestId('progress-title-text')).toBeNull();
    expect(queryByTestId('progress-subtitle-text')).toBeNull();
    expect(queryByTestId('progress-bar-value-prefix')).toBeNull();
    expect(queryByTestId('progress-bar-value-suffix')).toBeNull();
  });
  it('should render the given title', () => {
    const title = 'title';
    const {
      getByText
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      title: title
    }));
    const titleText = getByText(title);
    expect(titleText).toBeTruthy();
  });
  it('should not display progress text if showProgressValue is false', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      showProgressValue: false
    }));
    expect(queryByTestId('progress-value')).toBeNull();
  });
  it('should not render title if title is not provided', async () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50
    }));
    expect(queryByTestId('progress-title-text')).toBeNull();
  });
  it('should render subtitle', () => {
    const subtitle = 'subtitle';
    const {
      getByText
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      subtitle: subtitle
    }));
    expect(getByText(subtitle)).toBeDefined();
  });
  it('should not render subtitle if subtitle is not provided', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50
    }));
    expect(queryByTestId('progress-subtitle-text')).toBeNull();
  });
  it('should render the progress value in the given color', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      progressValueColor: "blue"
    }));
    expect(getByTestId('progress-value-text').props.style[2].color).toBe('blue');
  });
  it('should render the progress value in the given style', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      progressValueStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      }
    }));
    expect(getByTestId('progress-value-text').props.style[1]).toEqual({
      fontSize: 12,
      fontWeight: 'bold'
    });
  });
  it('should render prefix', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      valuePrefix: '$'
    }));
    expect(queryByTestId('progress-bar-value-prefix')).toBeDefined();
  });
  it('should render suffix', () => {
    const {
      queryByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      value: 50,
      valueSuffix: '%'
    }));
    expect(queryByTestId('progress-bar-value-suffix')).toBeDefined();
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