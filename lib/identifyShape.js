function identifyShape(shape) {
  switch(shape.length) {
    case 2: {
      if(!Array.isArray(shape[0])) return 'point';
      if(Array.isArray(shape[1])) {
        return 'segment';
      } else {
        return 'circle';
      }
    }
    case 3: {
      if(!Array.isArray(shape[2])) {
        return 'rectangle';
      } else {
        return 'polygon';
      }
    }
    default: {
      return 'polygon';
    }
  }
}

module.exports = identifyShape;