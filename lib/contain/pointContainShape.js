var pointContainShape = {
  point: function (point1, point2) {
    return Math.floor(point1[0] * 100) === Math.floor(point2[0] * 100)
        && Math.floor(point1[1] * 100) === Math.floor(point2[1] * 100);
  }
};

module.exports = pointContainShape;