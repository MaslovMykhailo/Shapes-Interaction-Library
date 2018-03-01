var segmentIntersectShape = require('./segmentShapeIntersect.js');
var pointIntersectShape = require('./pointShapeIntersect.js');
var circleIntersectShape = require('./circleShapeIntersect.js');
var mathFunc = require('../math/mathFunctions.js');
var contain = require('../contain/contain.js');

var rectangleIntersectShape = {
  point: function (rect, point) {
    return pointIntersectShape.rectangle(point, rect);
  },
  segment: function (rect, segment) {
    return segmentIntersectShape.rectangle(segment, rect);
  },
  circle: function (rect, circle) {
    return circleIntersectShape.rectangle(circle, rect);
  },
  rectangle: function (rect1, rect2) {
    if (contain(rect1, rect2) && contain(rect2, rect1)) return true;
    if (contain(rect1, rect2) || contain(rect2, rect1)) return false;
    var minx1 = rect1[0][0];
    var miny1 = rect1[0][1];
    var maxx1 = rect1[0][0] + rect1[1];
    var maxy1 = rect1[0][1] + rect1[2];
    
    var minx2 = rect2[0][0];
    var miny2 = rect2[0][1];
    var maxx2 = rect2[0][0] + rect2[1];
    var maxy2 = rect2[0][1] + rect2[2];
    
    return (maxx1 >= minx2 && minx1 <= maxx2) &&
           (maxy1 >= miny2 && miny1 <= maxy2);
  },
  polygon: function (rect, polygon) {
    var arrOfSegments = mathFunc.segmentsOfPolygon(polygon);
    for (var i = 0; i < arrOfSegments.length; i++) {
      if (this.segment(rect, arrOfSegments[i])) return true;
    }
    return false;
  }
};

module.exports = rectangleIntersectShape;