var mathFunc = require('../math/mathFunctions.js');

var retangleContainShape = {
  point: function (rect, point) {
    var xmin = rect[0][0];
    var xmax = rect[0][0] + rect[1];
    var ymin = rect[0][1];
    var ymax = rect[0][1] + rect[2];
    
    return point[0] >= xmin && point[0] <= xmax &&
      point[1] >= ymin && point[1] <= ymax;
  },
  segment: function (rect, segment) {
    return this.point(rect, segment[0]) && this.point(rect, segment[1]);
  },
  rectangle: function (bigRect, smallRect) {
    var points = mathFunc.pointsOfRect(smallRect);
    for (var i = 0; i < 4; i++) {
      if (!this.point(bigRect, points[i])) return false;
    }
    return true;
  },
  circle: function (rect, circle) {
    var square =
      [[circle[0][0] - circle[1], circle[0][1] - circle[1]], 2 * circle[1], 2 * circle[1]];
    return this.rectangle(rect, square);
  },
  polygon: function (rect, polygon) {
    for (var i = 0; i < polygon.length; i++) {
      if (!this.point(rect, polygon[i])) return false;
    }
    return true;
  }
};

module.exports = retangleContainShape;