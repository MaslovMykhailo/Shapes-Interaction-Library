var intersection = require('../lib/intersection/intersection.js');
var assert = require('assert');

describe('intersection point with ->', function() {
  
  it('-> point', function() {
    assert.equal(intersection([1, 1], [1, 1]), true);
    assert.equal(intersection([1, 2], [1, 1]), false);
  });
  
  it('-> segment', function() {
    assert.equal(intersection([10, 10], [[1, 1], [10, 10]]), true);
    assert.equal(intersection([1, 1], [[1, 1], [1, 1]]), true);
    assert.equal(intersection([1.64, 2], [[1, 1], [10, 15]]), true);
    assert.equal(intersection([10, 10], [[1, 1], [10, 15]]), false);
    assert.equal(intersection([[1, 1], [10, 10]], [0, 0]), false);
    assert.equal(intersection([[1, 10], [10, 9]], [10, 9]), true);
  });
  
  it('-> circle', function() {
    assert.equal(intersection([10, 10],[[10, 10], 10]), false);
    assert.equal(intersection([10, 20],[[10, 10], 10]), true);
    assert.equal(intersection([20, 10],[[10, 10], 10]), true);
    assert.equal(intersection([15, 15],[[10, 10], 10]), false);
    assert.equal(intersection([5, 5],[[10, 10], 10]), false);
    assert.equal(intersection([0, 0],[[10, 10], 10]), false);
    assert.equal(intersection([20, 25],[[10, 10], 10]), false);
    assert.equal(intersection([0, 0],[[10.11, 9.95], 8.559]), false);
  });
  
  it('-> rect', function() {
    assert.equal(intersection([12, 41],[[12, 41], 10, 10] ), true);
    assert.equal(intersection([20, 41],[[12, 41], 10, 10] ), true);
    assert.equal(intersection([12, 45],[[12, 41], 10, 10] ), true);
    assert.equal(intersection([15, 45],[[12, 41], 10, 10] ), false);
    assert.equal(intersection([1, 0],[[12, 41], 10, 10] ), false);
    assert.equal(intersection([120, 41],[[12, 41], 10, 10] ), false);
  });
  
  it('-> polygon', function() {
    assert.equal(intersection([10, 10], [[5, 8], [10, 10], [12, 43]]), true);
    assert.equal(intersection([10, 10], [[8, 20], [9, 9], [35, 8]]), false);
    assert.equal(intersection([8, 8], [[8, 20], [9, 9], [35, 8]]), false);
    assert.equal(intersection([11, 15], [[8, 20], [9, 9], [35, 8]]), false);
    assert.equal(intersection([90, 90], [[8, 20], [9, 9], [35, 8]]), false);
    assert.equal(intersection([16, 25], [[0, 0], [100, 0], [15, 25], [100, 50], [0, 50]]), false);
  });
});

describe('intersection segment with ->', function() {
  it('-> segment', function() {
    assert.equal(intersection([[0, 0], [150, 100]], [[100, 0], [0, 155]]), true);
    assert.equal(intersection([[0, 0], [150, 100]], [[0, 0], [0, 155]]), true);
    assert.equal(intersection([[0, 0], [150, 100]], [[100, 0], [150, 100]]), true);
    assert.equal(intersection([[0, 0], [150, 100]], [[150, 100], [0, 155]]), true);
    assert.equal(intersection([[0, 0], [150, 0]], [[100, 0], [10, 155]]), true);
    assert.equal(intersection([[0, 0], [0, 100]], [[0, 51], [0, 155]]), true);
    assert.equal(intersection([[10, 10], [150, 100]], [[160, 60], [170, 155]]), false);
    assert.equal(intersection([[0, 0], [150, 100]], [[1, 0], [151, 100]]), false);
    assert.equal(intersection([[0, 0], [150, 0]], [[10, 10], [123, 10]]), false);
    assert.equal(intersection([[0, 0], [150, 100]], [[0, 0], [150, 100]]), true);
    assert.equal(intersection([[0, 0], [100, 100]], [[50, 50], [123, 123]]), true);
  });
  it('-> circle', function() {
    assert.equal(intersection([[25, 20], [90, 100]], [[10, 20], 15]), true);
    assert.equal(intersection([[25, 20], 10], [[25, 30], [45, 71]]), true);
    assert.equal(intersection([[100, 60], [200, 60]], [[110, 45], 15]), true);
    assert.equal(intersection([[25, 0], [25, 100]], [[10, 20], 15]), true);
    assert.equal(intersection([[25, 20], [30, 10]], [[20, 20], 150]), false);
    assert.equal(intersection([[10, 10], [25, 25]], [[15, 15], 40]), false);
    assert.equal(intersection([[30, 40], [100, 90]], [[35, 20], 25]), true);
    assert.equal(intersection([[35, 25], [90, 100]], [[10, 20], 5]), false);
    assert.equal(intersection([[0, 0], [0, 100]], [[10, 10], 9]), false);
  });
  it('-> rect', function() {
    assert.equal(intersection([[10, 45], [51, 100]], [[10, 45], 14, 14]), true);
    assert.equal(intersection([[10, 10], [50, 50]], [[30, 30], 222, 14]), true);
    assert.equal(intersection([[110, 110], [115, 115]], [[100, 100], 155, 155]), false);
    assert.equal(intersection([[10, 10], [40, 10]], [[10, 10], 40, 25]), true);
    assert.equal(intersection([[20, 10], [30, 10]], [[10, 10], 40, 25]), true);
    assert.equal(intersection([[50, 60], [55, 100]], [[10, 45], 140, 200]), false);
    assert.equal(intersection([[0, 45], [0, 100]], [[1, 45], 14, 14]), false);
    assert.equal(intersection([[90, 45], [50, 100]], [[70, 30], 110, 140]), true);
    assert.equal(intersection([[10, 45], [51, 10]], [[100, 450], 14, 14]), false);
    assert.equal(intersection([[10, 0], [50, 0]], [[10, 0.5], 14, 14]), false);
    assert.equal(intersection([[10, 45], 140, 200], [[50, 60], [55, 100]]), false);
    assert.equal(intersection([[1, 45], 14, 14], [[0, 45], [0, 100]]), false);
    assert.equal(intersection([[70, 30], 110, 140], [[90, 45], [50, 100]]), true);
    assert.equal(intersection([[100, 450], 14, 14], [[10, 45], [51, 10]]), false);
    assert.equal(intersection([[10, 0.5], 14, 14], [[10, 0], [50, 0]]), false)
  });
  it('-> polygon', function() {
    assert.equal(intersection([[0, 15], [90, 30], [20, 140]], [[0, 15], [90, 30]]), true);
    assert.equal(intersection([[0, 15], [90, 30], [20, 140]], [[0, 15], [20, 140]]), true);
    assert.equal(intersection([[0, 15], [90, 30], [20, 140]], [[0, 15], [10000, 30]]), true);
    assert.equal(intersection([[0, 15], [90, 30], [20, 140]], [[5, 16], [10, 50]]), false);
    assert.equal(intersection([[0, 15], [90, 30]], [[0, 15], [90, 30], [20, 140]]), true);
  });
});

describe('intersection circle with ->', function() {
  it('-> rect', function() {
    assert.equal(intersection([[30, 30], 15], [[10, 40], 20, 40]), true);
    assert.equal(intersection([[10, 40], 20, 40],[[30, 30], 15]), true);
    assert.equal(intersection([[15, 10], 5, 10],[[30, 30], 100]), false);
    assert.equal(intersection([[10, 10], 20, 40],[[35, 15], 15]), true);
    assert.equal(intersection([[10, 10], 10, 100],[[25, 50], 15]), true);
    assert.equal(intersection([[10, 10], 100, 90],[[45, 30], 5]), false);
    assert.equal(intersection([[10, 10], 10], [[0, 0], 20, 40]), true);
  });
  it('-> circle', function() {
    assert.equal(intersection([[30, 15], 30], [[40, 15], 25]), true);
    assert.equal(intersection([[30, 15], 45], [[30, 45], 30]), true);
    assert.equal(intersection([[30, 60], 30], [[30 , 0], 30]), true);
    assert.equal(intersection([[30, 15], 300], [[40, 15], 20]), false);
    assert.equal(intersection([[30, 15], 30], [[30, 15], 20]), false);
    assert.equal(intersection([[30, 15], 30], [[110, 15], 20]), false);
  });
  it('-> polygon', function() {
    assert.equal(intersection([[20, 20], 20], [[15, 69], [18, 30], [111, 56]]), true);
    assert.equal(intersection([[20, 20], 20], [[15, 69], [18, 30], [34, 25]]), true);
    assert.equal(intersection([[20, 20], 20], [[145, 12], [40, 123], [40, 0]]), true);
    assert.equal(intersection([[20, 20], 50], [[30, 30], [18, 32], [13, 19]]), false);
    assert.equal(intersection([[20, 20], 15], [[0, 69], [1111, 0], [-1, 0]]), false);
  });
});

describe('intersection rect with ->', function() {
  it('-> rect', function() {
    assert.equal(intersection([[11, 12], 40, 12], [[11, 12], 40, 12]), true);
    assert.equal(intersection([[10, 50], 40, 20], [[15, 40], 10, 5]), false);
    assert.equal(intersection([[10, 12], 40, 13], [[50, 25], 40, 1]), true);
    assert.equal(intersection([[15, 40], 40, 10], [[30, 45], 40, 40]), true);
    assert.equal(intersection([[10, 20], 50, 30], [[20, 15], 15, 15]), true);
    assert.equal(intersection([[50, 50], 20, 5], [[40, 40], 20, 20]), true);
  });
  it('-> polygon', function() {
    assert.equal(intersection([[30, 30], 20, 30], [[10, 40], [13, 100], [35, 40]]), true);
    assert.equal(intersection([[30, 30], 20, 30], [[35, 40], [41, 100], [50, 45]]), true);
    assert.equal(intersection([[30, 30], 20, 30], [[50, 60], [50, 30], [111, 223]]), true);
    assert.equal(intersection([[30, 30], 20, 30], [[50, 60], [131, 100], [234, 140]]), true);
    assert.equal(intersection([[30, 30], 20, 30], [[40, 40], [45, 45], [40, 45]]), false);
    assert.equal(intersection([[30, 30], 20, 30], [[0, 10], [10, 10], [10, 0]]), false);
    assert.equal(intersection([[10, 40], [13, 100], [35, 40]], [[30, 30], 20, 30]), true);
    assert.equal(intersection([[35, 40], [41, 100], [50, 45]], [[30, 30], 20, 30]), true);
    assert.equal(intersection([[50, 60], [50, 30], [111, 223]], [[30, 30], 20, 30]), true);
    assert.equal(intersection([[50, 60], [131, 100], [234, 140]], [[30, 30], 20, 30]), true);
    assert.equal(intersection([[40, 40], [45, 45], [40, 45]], [[30, 30], 20, 30]), false);
    assert.equal(intersection([[0, 10], [10, 10], [10, 0]], [[30, 30], 20, 30]), false);
  });
});

describe('intersection polygon with ->', function() {
  it('-> polygon', function() {
    assert.equal(intersection([[0, 0], [45, 90], [90, 0]], [[0, 0], [45, 90], [90, 0]]), true);
    assert.equal(intersection([[0, 0], [45, 90], [90, 0]], [[0, 30], [45, 45], [12, 111]]), true);
    assert.equal(intersection([[0, 10], [45, 90], [90, 10]], [[30, 0], [25, 40], [50, 35]]), true);
    assert.equal(intersection([[0, 0], [45, 90], [90, 0]], [[0, 0], [45, 90], [-10, 0]]), true);
    assert.equal(intersection([[0, 0], [45, 90], [90, 0]], [[10, 5], [15, 10], [20, 5]]), false);
    assert.equal(intersection([[0, 0], [45, 90], [90, 0]], [[100, 0], [450, 90], [200, 0]]), false);
  });
});
