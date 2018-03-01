var identifyShape = require('../identifyShape.js');
var pointContainShape = require('./pointContainShape.js');
var segmentContainShape = require('./segmentContainShape.js');
var circleContainShape = require('./circleContainShape.js');
var rectangleContainShape = require('./rectContainShape.js');
var polygonContainShape = require('./polygonContainShape.js');

function contain(shape1, shape2) {
  var type1 = identifyShape(shape1);
  var type2 = identifyShape(shape2);
  
  var methods = {
    point: function () {
      return pointContainShape[type2](shape1, shape2);
    },
    segment: function () {
      return segmentContainShape[type2](shape1, shape2);
    },
    rectangle: function () {
      return rectangleContainShape[type2](shape1, shape2);
    },
    circle: function () {
      return circleContainShape[type2](shape1, shape2);
    },
    polygon: function () {
      return polygonContainShape[type2](shape1, shape2);
    }
  };
  
  if(type1 === 'point' && type2 !== 'point') return false;
  if(type1 === 'segment' && type2 !== 'point' && type2 !== 'segment') return false;
  return methods[type1]();
}

module.exports = contain;