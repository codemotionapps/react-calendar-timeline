'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arrow(endPoint) {
  var _endPoint = _slicedToArray(endPoint, 2),
      x = _endPoint[0],
      y = _endPoint[1];

  var size = 4;
  var top = [x - size, y - size];
  var bottom = [x - size, y + size];
  return '\n    ' + [x - 2, y] + '\n    M ' + top + '\n    L ' + endPoint + '\n    ' + bottom;
}

function arc(x, y) {
  return 'a 5,5 0 0 1 ' + x + ',' + y;
}

function cubic(startPoint, controlPoint, controlPoint2, endPoint) {
  return '\n  M ' + startPoint + '\n  C ' + controlPoint + '\n  ' + controlPoint2 + '\n  ' + arrow(endPoint) + '\n';
}

function rectangular(startPoint, endPoint, width) {
  return '\n  M ' + startPoint + '\n  l 7, 0\n  ' + arc(5, 5) + '\n  l 0, 22\n  ' + arc(-5, 5) + '\n  h ' + -(width + 16) + '\n  ' + arc(-5, -5) + '\n  l 0, -22\n  ' + arc(5, -5) + '\n  l 8, 0\n  m -4,4\n  l 4,-4\n  -4,-4\n';
}

var Connection = function Connection(_ref) {
  var startPoint = _ref.startPoint,
      width = _ref.width,
      horizontallyAligned = _ref.horizontallyAligned,
      controlPoint = _ref.controlPoint,
      controlPoint2 = _ref.controlPoint2,
      endPoint = _ref.endPoint,
      selected = _ref.selected,
      warning = _ref.warning,
      onClick = _ref.onClick,
      onMouseOver = _ref.onMouseOver;

  return _react2.default.createElement('path', { onClick: onClick, onMouseOver: onMouseOver,
    d: horizontallyAligned && warning ? rectangular(startPoint, endPoint, width) : cubic(startPoint, controlPoint, controlPoint2, endPoint),
    fill: 'none',
    stroke: warning ? '#FF534D' : selected ? '#00a0fc' : '#d5dbe6',
    strokeWidth: 2
  });
};

exports.default = Connection;