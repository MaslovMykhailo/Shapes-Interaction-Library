var mathFunc = require('../math/mathFunctions.js');
var rectangleContainShape = require('./rectContainShape.js');
var segmentContainShape = require('./segmentContainShape.js');
var pointContainShape = require('./pointContainShape.js');

var polygonContainShape = {
  point: function (polygon, point) {
    for (var i = 0; i < polygon.length; i++) {
      if (pointContainShape.point(polygon[i], point)) return true;
    }
    if (rectangleContainShape.point(mathFunc.outerRectOfPolygon(polygon), point)) {
      var l = [[0, 0], point];
      var arrOfSegments = mathFunc.segmentsOfPolygon(polygon);
      var count = 0;
      
      for (var i = 0; i < arrOfSegments.length; i++) {
        if (segmentsIntersect(l, arrOfSegments[i])) count++;
        if (segmentContainShape.point(l, polygon[i])) count--;
      }
      
      return count % 2 === 1;
    } else {
      return false;
    }
  },
  segment: function (polygon, segment) {
    return this.point(polygon, segment[0])
      && this.point(polygon, segment[1]);
  },
  rectangle: function (polygon, rect) {
    var points = mathFunc.pointsOfRect(rect);
    for (var i = 0; i < 4; i++) {
      if (!this.point(polygon, points[i])) return false;
    }
    return true;
  },
  polygon: function (bigPolygon, smallPolygon) {
    for (var i = 0; i < smallPolygon.length; i++) {
      if (!this.point(bigPolygon, smallPolygon[i])) return false;
    }
    return true;
  },
  circle: function (polygon, circle) {
    var p1 = [circle[0][0] - circle[1], circle[0][1]];
    var p2 = [circle[0][0] - circle[1] / 2, circle[0][1] - circle[1]];
    var p3 = [circle[0][0] + circle[1] / 2, circle[0][1] - circle[1]];
    var p4 = [circle[0][0] + circle[1], circle[0][1]];
    var p5 = [circle[0][0] + circle[1] / 2, circle[0][1] + circle[1]];
    var p6 = [circle[0][0] - circle[1] / 2, circle[0][1] + circle[1]];
    
    return this.polygon(polygon, [p1, p2, p3, p4, p5, p6]);
  }
};

function segmentsIntersect(segment1, segment2) {
  var p = mathFunc.pointOfLineIntersect(segment1, segment2);
  if(p) {
    return segmentContainShape.point(segment1, p) &&
           segmentContainShape.point(segment2, p);
  }
  var p0 = segment1[0];
  var p1 = segment1[1];
  
  return segmentContainShape.point(segment2, p0) ||
         segmentContainShape.point(segment2, p1);
}

module.exports = polygonContainShape;