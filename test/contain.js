var assert = require('assert');
var contain = require('../lib/contain/contain');

describe('point contain ->', function() {
  it('-> point', function() {
    assert.equal(contain([12, 12], [12, 12]), true);
    assert.equal(contain([10, 12], [10, 12]), true);
    assert.equal(contain([12, 120], [120, 12]), false);
    assert.equal(contain([10.0001, 12.1234], [10.0002, 12.1251]), true);
  });
});

describe('segment contain ->', function() {
  it('-> point', function() {
    assert.equal(contain([[13, 14], [10, 10]], [13, 14]), true);
    assert.equal(contain([[13, 14], [10, 10]], [10, 10]), true);
    assert.equal(contain([[13.0007, 14.0002], [10, 10]], [13.0001, 14.0009]), true);
    assert.equal(contain([[20, 20], [10, 10]], [15, 15]), true);
    assert.equal(contain([[10, 15], [0, 0]], [2, 3]), true);
    assert.equal(contain([[13, 14], [10, 10]], [9, 14]), false);
    assert.equal(contain([[13, 14], [10, 10]], [10.4, 10.3]), false);
  });
  it('-> segment', function() {
    assert.equal(contain([[13, 14], [14, 69]], [[13, 14], [14, 69]]), true);
    assert.equal(contain([[0, 0], [10, 10]], [[1, 1], [5, 5]]), true);
    assert.equal(contain([[0, 0], [10, 10]], [[7, 7], [15, 15]]), false);
    assert.equal(contain([[0, 0], [20, 30]], [[2, 3], [10, 15]]), true);
    assert.equal(contain([[2, 3], [10, 15]], [[0, 0], [20, 30]]), false);
    assert.equal(contain([[2, 3], [10, 15]], [[15, 10], [10, 0]]), false);
  });
});

describe('circle contain ->', function() {
  it('-> point', function() {
    assert.equal(contain([[0, 0], 10], [0, 0]), true);
    assert.equal(contain([[0, 0], 10], [2, 0]), true);
    assert.equal(contain([[0, 0], 10], [0, 10]), true);
    assert.equal(contain([[0, 0], 10], [0, 11]), false);
    assert.equal(contain([0, 0], [[0, 0], 10]), false);
  });
  it('-> segment', function() {
    assert.equal(contain([[10, 10], 15], [[0, 0], [10, 10]]), true);
    assert.equal(contain([[10, 10], 15], [[-5, 10], [15, 10]]), true);
    assert.equal(contain([[10, 10], 15], [[0, 10], [0, 20]]), true);
    assert.equal(contain([[10, 10], 15], [[10, 0], [20, 0]]), true);
    assert.equal(contain([[10, 10], 15], [[0, 0], [30, 10]]), false);
    assert.equal(contain([[0, 0], [10, 10]], [[10, 10], 15]), false);
  });
  it('-> circle', function() {
    assert.equal(contain([[10, 10], 15], [[10, 10], 10]), true);
    assert.equal(contain([[10, 10], 15], [[10, 10], 15]), true);
    assert.equal(contain([[10, 10], 15], [[5, 5], 7]), true);
    assert.equal(contain([[10, 10], 15], [[2, 3], 1]), true);
    assert.equal(contain([[10, 10], 15], [[10, 10], 100]), false);
    assert.equal(contain([[10, 10], 15], [[1, 10], 50]), false);
    assert.equal(contain([[10, 10], 15], [[20, 10], 10]), false);
  });
  it('-> rect', function() {
    assert.equal(contain([[10, 10], 50], [[0, 10], 10, 15]), true);
    assert.equal(contain([[10, 10], 50], [[25, 25], 15, 15]), true);
    assert.equal(contain([[10, 10], 10], [[0, 0], 10, 15]), false);
    assert.equal(contain([[10, 10], 20], [[0, 10], 10, 15]), true);
    assert.equal(contain([[0, 10], 10, 15], [[10, 10], 50]), false);
  });
  it('-> polygon', function() {
    assert.equal(contain([[15, 15], 20], [[5, 5], [10, 0], [15, 30]]), true);
    assert.equal(contain([[15, 15], 20], [[5, 5], [10, 0], [0, 15]]), true);
    assert.equal(contain([[15, 15], 20], [[0, 0], [10, 56], [50, 30], [111, 25]]), false);
    assert.equal(contain([[0, 0], [10, 0], [15, 30]], [[15, 15], 20]), false);
    assert.equal(contain([[15, 15], 15], [[0, 15], [15, 30], [15, 0]]), true);
  });
});

describe('rect contain ->', function() {
  it('-> point', function() {
    assert.equal(contain([[10, 10], 20 ,15], [10, 10]), true);
    assert.equal(contain([[10, 10], 20 ,15], [30, 10]), true);
    assert.equal(contain([[10, 10], 20 ,15], [30, 25]), true);
    assert.equal(contain([[10, 10], 20 ,15], [10, 25]), true);
    assert.equal(contain([[10, 10], 20 ,15], [15, 20]), true);
    assert.equal(contain([[10, 10], 20 ,15], [15, 25]), true);
    assert.equal(contain([[10, 10], 20 ,15], [15, 15]), true);
    assert.equal(contain([[10, 10], 20 ,15], [40, 40]), false);
    assert.equal(contain([10, 10], [[10, 10], 20 ,15]), false);
    assert.equal(contain([[10, 10], 20 ,15], [9, 10]), false);
  });
  it('-> segment', function() {
    assert.equal(contain([[10, 10], 20, 15], [[10, 10], [30, 15]]), true);
    assert.equal(contain([[10, 10], 20, 15], [[30, 25], [30, 15]]), true);
    assert.equal(contain([[10, 10], 20, 15], [[11, 11], [14, 14]]), true);
    assert.equal(contain([[10, 10], 20, 15], [[9, 10], [30, 15]]), false);
    assert.equal(contain([[10, 10], 20, 15], [[11, 10], [31, 15]]), false);
    assert.equal(contain([[10, 10], [30, 15]], [[10, 10], 20, 15]), false);
  });
  it('-> circle', function() {
    assert.equal(contain([[10, 10], 15, 20], [[15, 15], 5]), true);
    assert.equal(contain([[10, 10], 20, 20], [[15, 15], 2]), true);
    assert.equal(contain([[15, 15], 5], [[10, 10], 15, 20]), false);
    assert.equal(contain([[10, 10], 15, 20], [[10, 15], 5]), false);
    assert.equal(contain([[10, 10], 15, 20], [[15, 15], 50]), false);
  });
  it('-> rect', function() {
    assert.equal(contain([[15, 15], 20, 30], [[15, 15], 20, 20]), true);
    assert.equal(contain([[10, 10], 20, 30], [[10, 10], 20, 30]), true);
    assert.equal(contain([[15, 15], 20, 30], [[10, 15], 40, 2]), false);
    assert.equal(contain([[15, 15], 40, 50], [[20, 20], 15, 20]), true);
    assert.equal(contain([[20, 20], 15, 20], [[15, 15], 40, 50]), false);
  });
  it('-> polygon', function() {
    assert.equal(contain([[15, 15], 40, 50], [[15, 15], [30, 30], [20, 40]]), true);
    assert.equal(contain([[15, 15], 40, 50], [[15, 15], [60, 30], [20, 90]]), false);
    assert.equal(contain([[15, 15], [30, 30], [20, 40]], [[15, 15], 40, 50]), false);
    assert.equal(contain([[15, 15], 40, 50], [[17, 17], [30, 30], [20, 40]]), true);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [[15, 15], 40, 50]), false);
  });
});

describe('polygon contain ->', function() {
  it('-> point', function() {
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [0, 15]), true);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [5, 16]), true);
    assert.equal(contain([5, 16], [[0, 15], [90, 30], [20, 140]]), false);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [0, 0]), false);
    assert.equal(contain([[0, 0], [30, 0], [0, 30]], [5, 5]), true);
  });
  it('-> segment', function() {
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [[0, 15], [90, 30]]), true);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [[0, 15], [20, 140]]), true);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [[0, 15], [10000, 30]]), false);
    assert.equal(contain([[0, 15], [90, 30], [20, 140]], [[5, 16], [10, 50]]), true);
    assert.equal(contain([[0, 15], [90, 30]], [[0, 15], [90, 30], [20, 140]]), false);
  });
  it('-> circle', function() {
    assert.equal(contain([[0, 15], [90, 30], [60, 140], [25, 90]], [[0, 15], 15]), false);
    assert.equal(contain([[0, 0], [0, 20], [15, 35], [40 ,70], [0, 60]], [[10, 10], 5]), true);
  });
  it('-> rect', function() {
    assert.equal(contain([[0, 0], [0, 20], [15, 35], [40 ,70], [0, 60]], [[0, 0], 10, 15]), true);
    assert.equal(contain([[0, 0], [0, 20], [15, 35], [40 ,70], [0, 60]], [[0, 0], 50, 40]), false);
    assert.equal(contain([[0, 0], 10, 15], [[0, 0], [0, 20], [15, 35], [40 ,70], [0, 60]]), false);
  });
  it('-> polygon', function() {
    assert.equal(contain([[0, 0], [0, 30], [30, 0]], [[0, 0], [0, 30], [30, 0]]), true);
    assert.equal(contain([[0, 0], [0, 30], [30, 0]], [[5, 5], [5, 20], [20, 5]]), true);
    assert.equal(contain([[5, 5], [5, 20], [20, 5]], [[0, 0], [0, 30], [30, 0]]), false);
    assert.equal(contain([[0, 0], [0, 30], [30, 0]], [[5, 5], [10, 110], [120, 50]]), false);
  });
});