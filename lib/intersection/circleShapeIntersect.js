var segmentIntersectShape = require('./segmentShapeIntersect.js');
var pointIntersectShape = require('./pointShapeIntersect.js');
var mathFunc = require('../math/mathFunctions.js');
var contain = require('../contain/contain.js');

var circleIntersectShape = {
  point: function (circle, point) {
    return pointIntersectShape.circle(point, circle);
  },
  segment: function (circle, segment) {
    return segmentIntersectShape.circle(segment, circle);
  },
  circle: function (circle1, circle2) {
    if (contain(circle1, circle2) || contain(circle2, circle1)) return false;
    
    var l = mathFunc.segmentLength([circle1[0], circle2[0]]);
    return l <= circle1[1] + circle2[1];
  },
  rectangle: function (circle, rect) {
    var xmin = rect[0][0];
    var ymin = rect[0][1];
    var xmax = rect[0][0] + rect[1];
    var ymax = rect[0][1] + rect[2];
    
    return segmentIntersectShape.circle([[xmin, ymin], [xmax, ymin]], circle) ||
           segmentIntersectShape.circle([[xmin, ymin], [xmin, ymax]], circle) ||
           segmentIntersectShape.circle([[xmax, ymax], [xmin, ymax]], circle) ||
           segmentIntersectShape.circle([[xmax, ymax], [xmax, ymin]], circle);
  },
  polygon: function (circle, polygon) {
    var arrOfSegments = mathFunc.segmentsOfPolygon(polygon);
    for (var i = 0; i < arrOfSegments.length; i++) {
      if (this.segment(circle, arrOfSegments[i])) return true;
    }
    return false;
  }
};

module.exports = circleIntersectShape;