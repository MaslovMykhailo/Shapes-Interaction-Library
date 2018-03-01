var mathFunc = require('../math/mathFunctions.js');

var segmentContainShape = {
  point: function (segment, point) {
    var l = mathFunc.segmentLength(segment);
    var l1 = mathFunc.segmentLength([point, segment[0]]);
    var l2 = mathFunc.segmentLength([point, segment[1]]);
    
    return Math.abs(l1 + l2 - l) < 0.01;
  },
  segment: function (bigSegment, smallSegment) {
    return this.point(bigSegment, smallSegment[0])
        && this.point(bigSegment, smallSegment[1]);
  }
};

module.exports = segmentContainShape;