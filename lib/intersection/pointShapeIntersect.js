var mathFunc = require('../math/mathFunctions.js');

var pointIntersectShape = {
  point: function (point1, point2) {
    return Math.floor(point1[0] * 100) === Math.floor(point2[0] * 100)
      && Math.floor(point1[1] * 100) === Math.floor(point2[1] * 100);
  },
  segment: function (point, segment) {
    var l = mathFunc.segmentLength(segment);
    var l1 = mathFunc.segmentLength([point, segment[0]]);
    var l2 = mathFunc.segmentLength([point, segment[1]]);
    
    return Math.abs(l1 + l2 - l) <= 0.01;
  },
  rectangle: function (point, rect) {
    var segments = mathFunc.segmentsOfRect(rect);
    
    for (var i = 0; i < segments.length; i++) {
      if (this.segment(point, segments[i])) return true;
    }
    return false;
  },
  circle: function (point, circle) {
    var l = mathFunc.segmentLength([[point[0], point[1]], [circle[0][0], circle[0][1]]]);
    return Math.abs(circle[1] - l) <= 0.01;
  },
  polygon: function (point, polygon) {
    var segments = mathFunc.segmentsOfPolygon(polygon);
    for (var i = 0; i < segments.length; i++) {
      if (this.segment(point, segments[i])) return true;
    }
    return false;
  }
};

module.exports = pointIntersectShape;