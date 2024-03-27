"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = waitFor;
exports.waitForElement = waitForElement;

var React = _interopRequireWildcard(require("react"));

var _act = _interopRequireDefault(require("./act"));

var _errors = require("./helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_TIMEOUT = 4500;
const DEFAULT_INTERVAL = 50;

function checkReactVersionAtLeast(major, minor) {
  if (React.version === undefined) return false;
  const [actualMajor, actualMinor] = React.version.split('.').map(Number);
  return actualMajor > major || actualMajor === major && actualMinor >= minor;
}

function waitForInternal(expectation, options) {
  var _options$timeout, _options$interval;

  const timeout = (_options$timeout = options === null || options === void 0 ? void 0 : options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : DEFAULT_TIMEOUT;
  const interval = (_options$interval = options === null || options === void 0 ? void 0 : options.interval) !== null && _options$interval !== void 0 ? _options$interval : DEFAULT_INTERVAL;
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const rejectOrRerun = error => {
      if (Date.now() - startTime >= timeout) {
        reject(error);
        return;
      }

      setTimeout(runExpectation, interval);
    };

    function runExpectation() {
      try {
        const result = expectation();
        resolve(result);
      } catch (error) {
        rejectOrRerun(error);
      }
    }

    setTimeout(runExpectation, 0);
  });
}

async function waitFor(expectation, options) {
  if (!checkReactVersionAtLeast(16, 9)) {
    return waitForInternal(expectation, options);
  }

  let result; //$FlowFixMe: `act` has incorrect flow typing

  await (0, _act.default)(async () => {
    result = await waitForInternal(expectation, options);
  }); //$FlowFixMe: either we have result or `waitFor` threw error

  return result;
}

function waitForElement(expectation, _timeout = 4500, _interval = 50) {
  (0, _errors.throwRemovedFunctionError)('waitForElement', 'migration-v2#waitfor-api-changes');
  return Promise.reject();
}