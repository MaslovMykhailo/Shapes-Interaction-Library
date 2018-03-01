var pointIntersectShape = require('./pointShapeIntersect.js');
var mathFunc = require('../math/mathFunctions.js');
var contain = require('../contain/contain.js');

var segmentIntersectShape = {
  point: function (segment, point) {
    return pointIntersectShape.segment(point, segment);
  },
  segment: function (segment1, segment2) {
    var p = mathFunc.pointOfLineIntersect(segment1, segment2);
    if (p) {
      return pointIntersectShape.segment(p, segment1) &&
        pointIntersectShape.segment(p, segment2);
    }
    var p0 = segment1[0];
    var p1 = segment1[1];
    
    return pointIntersectShape.segment(p0, segment2) ||
      pointIntersectShape.segment(p1, segment2);
  },
  rectangle: function (segment, rect) {
    if (contain(rect, segment[0]) && !contain(rect, segment[1])) return true;
    if (contain(rect, segment[1]) && !contain(rect, segment[0])) return true;
    
    var segments = mathFunc.segmentsOfRect(rect);
    for (var i = 0; i < 4; i++) {
      if (this.segment(segment, segments[i])) return true;
    }
    return false;
  },
  circle: function (segment, circle) {
    var p0 = segment[0];
    var p1 = segment[1];
    
    if (contain(circle, p0) && contain(circle, p1)) return false;
    if (contain(circle, segment[0]) && !contain(circle, segment[1])) return true;
    if (contain(circle, segment[1]) && !contain(circle, segment[0])) return true;
    
    var normal = mathFunc.normalToPoint(segment, circle[0]);
    var p = mathFunc.pointOfLineIntersect(normal, segment);
    if (p && pointIntersectShape.segment(p, segment) &&
        contain(circle, p)) return true;
    
    return pointIntersectShape.circle(p0, circle) ||
           pointIntersectShape.circle(p1, circle);
  },
  polygon: function (segment, polygon) {
    if (contain(polygon, segment[0]) && !contain(polygon, segment[1])) return true;
    if (contain(polygon, segment[1]) && !contain(polygon, segment[0])) return true;
    
    var arrOfSegments = mathFunc.segmentsOfPolygon(polygon);
    for (var i = 0; i < arrOfSegments.length; i++) {
      if (this.segment(segment, arrOfSegments[i])) return true;
    }
    return false;
  }
};

module.exports = segmentIntersectShape;