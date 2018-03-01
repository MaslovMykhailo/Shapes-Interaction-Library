var mathFunc = require('../math/mathFunctions.js');

var circleContainShape = {
  point: function (circle, point) {
    var l = mathFunc.segmentLength([[point[0], point[1]], [circle[0][0], circle[0][1]]]);
    return circle[1] >= l;
  },
  segment: function (circle, segment) {
    return this.point(circle, segment[0]) && this.point(circle, segment[1]);
  },
  circle: function (bigCircle, smallCircle) {
    var l = mathFunc.segmentLength([bigCircle[0], smallCircle[0]]);
    return bigCircle[1] >= smallCircle[1] + l;
  },
  rectangle: function (circle, rect) {
    var points = mathFunc.pointsOfRect(rect);
    for (var i = 0; i < 4; i++) {
      if (!this.point(circle, points[i])) return false;
    }
    return true;
  },
  polygon: function (circle, polygon) {
    for (var i = 0; i < polygon.length; i++) {
      if (!this.point(circle, polygon[i])) return false;
    }
    return true;
  }
};

module.exports = circleContainShape;