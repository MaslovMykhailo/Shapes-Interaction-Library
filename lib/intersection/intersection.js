var segmentIntersectShape = require('./segmentShapeIntersect.js');
var pointIntersectShape = require('./pointShapeIntersect.js');
var circleIntersectShape = require('./circleShapeIntersect.js');
var rectangleIntersectShape = require('./rectangleShapeIntersect.js');
var polygonIntersectShape = require('./polygonShapeIntersect.js');
var identifyShape = require('../identifyShape.js');

function intersection(shape1, shape2) {
  var type1 = identifyShape(shape1);
  var type2 = identifyShape(shape2);
  
  var methods = {
    point: function () {
      return pointIntersectShape[type2](shape1, shape2);
    },
    segment: function () {
      return segmentIntersectShape[type2](shape1, shape2);
    },
    rectangle: function () {
      return rectangleIntersectShape[type2](shape1, shape2);
    },
    circle: function () {
      return circleIntersectShape[type2](shape1, shape2);
    },
    polygon: function () {
      return polygonIntersectShape[type2](shape1, shape2);
    }
  };
  
  return methods[type1]();
}

module.exports = intersection;