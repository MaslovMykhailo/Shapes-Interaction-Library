// functions for segments
function segmentLength(s) {
  return Math.sqrt(Math.pow(s[0][0] - s[1][0], 2) + Math.pow(s[0][1] - s[1][1], 2));
}

function normalToPoint(segment, point) {
  var directx = segment[1][1] - segment[0][1];
  var directy = segment[0][0] - segment[1][0];
  
  var normalx;
  var normaly;
  
  if(directx !== 0) {
    normalx = 100;
    normaly = (directy/directx) * (normalx - point[0]) + point[1];
  } else {
    normaly = 100;
    normalx = (directx/directy) * (normaly - point[1]) + point[0];
  }

  return [point, [normalx, normaly]];
}

function pointOfLineIntersect(segment1, segment2) {
  var A1 = segment1[1][1] - segment1[0][1];
  var B1 = segment1[0][0] - segment1[1][0];
  var C1 = A1 * segment1[0][0] + B1 * segment1[0][1];
  
  var A2 = segment2[1][1] - segment2[0][1];
  var B2 = segment2[0][0] - segment2[1][0];
  var C2 = A2 * segment2[0][0] + B2 * segment2[0][1];
  
  var denominator = A1 * B2 - A2 * B1;
  
  if(denominator === 0) return null;
  
  var x = (B2 * C1 - B1 * C2) / denominator;
  var y = (A1 * C2 - A2 * C1) / denominator;
  
  return [x, y];
}


// functions for polygons
function outerRectOfPolygon(polygon) {
  var xmax = -Infinity, xmin = Infinity, ymax = -Infinity, ymin = Infinity;
  
  for(var i = 0 ; i < polygon.length ; i++) {
    xmax = Math.max(xmax, polygon[i][0]);
    ymax = Math.max(ymax, polygon[i][1]);
    xmin = Math.min(xmin, polygon[i][0]);
    ymin = Math.min(ymin, polygon[i][1]);
  }
  
  return [[xmin, ymin], (xmax-xmin), (ymax-ymin)];
}

function segmentsOfPolygon(polygon) {
  var arrOfSegments = [];
  var points = polygon;
  
  for(var i = 0 ; i < points.length ; i++) {
    if(i === 0) {
      arrOfSegments.push([ points[points.length - 1], points[i] ]);
      continue;
    }
    
    arrOfSegments.push([ points[i-1], points[i] ]);
  }
  
  return arrOfSegments;
}


// functions for rectangles
function pointsOfRect(rect) {
  var p1 = rect[0];
  var p2 = [ rect[0][0] + rect[1], rect[0][1] ];
  var p3 = [ rect[0][0] + rect[1], rect[0][1] + rect[2] ];
  var p4 = [ rect[0][0], rect[0][1] + rect[2] ];
  
  return [p1, p2, p3, p4];
}

function segmentsOfRect(rect) {
  return segmentsOfPolygon(pointsOfRect(rect));
}


module.exports = {
  segmentLength: segmentLength,
  normalToPoint: normalToPoint,
  pointOfLineIntersect: pointOfLineIntersect,
  
  outerRectOfPolygon: outerRectOfPolygon,
  segmentsOfPolygon : segmentsOfPolygon,
  
  pointsOfRect: pointsOfRect,
  segmentsOfRect: segmentsOfRect
};