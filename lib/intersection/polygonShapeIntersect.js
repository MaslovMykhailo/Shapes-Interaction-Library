var segmentIntersectShape = require('./segmentShapeIntersect.js');
var pointIntersectShape = require('./pointShapeIntersect.js');
var circleIntersectShape = require('./circleShapeIntersect.js');
var rectangleIntersectShape = require('./rectangleShapeIntersect.js');
var mathFunc = require('../math/mathFunctions.js');

var polygonIntersectShape = {
  point: function (polygon, point) {
    return pointIntersectShape.polygon(point, polygon);
  },
  segment: function (polygon, segment) {
    return segmentIntersectShape.polygon(segment, polygon);
  },
  rectangle: function (polygon, rect) {
    return rectangleIntersectShape.polygon(rect, polygon);
  },
  circle: function (polygon, circle) {
    return circleIntersectShape.polygon(circle, polygon);
  },
  polygon: function (polygon1, polygon2) {
    if (rectangleIntersectShape.rectangle(
        mathFunc.outerRectOfPolygon(polygon1), mathFunc.outerRectOfPolygon(polygon2))) {
      var arrOfSegments1 = mathFunc.segmentsOfPolygon(polygon1);
      var arrOfSegments2 = mathFunc.segmentsOfPolygon(polygon2);
      
      for (var i = 0; i < arrOfSegments1.length; i++) {
        for (var j = 0; j < arrOfSegments2.length; j++) {
          if (segmentIntersectShape.segment(arrOfSegments1[i], arrOfSegments2[j]))
            return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
};

module.exports = polygonIntersectShape;