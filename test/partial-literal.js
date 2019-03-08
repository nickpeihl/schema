var schema = require('../mappings/partial/literal');

module.exports.tests = {};

module.exports.tests.compile = function(test, common) {
  test('valid schema file', function(t) {
    t.equal(typeof schema, 'object', 'schema generated');
    t.equal(Object.keys(schema).length>0, true, 'schema has body');
    t.end();
  });
};

// this should never need to change
module.exports.tests.type = function(test, common) {
  test('correct type', function(t) {
    t.equal(schema.type, 'text', 'correct value');
    t.end();
  });
};

module.exports.tests.store = function(test, common) {
  test('store unset (will not be stored)', function(t) {
    t.equal(schema.store, undefined, 'unset');
    t.end();
  });
};

// do not perform analysis on categories
// https://www.elastic.co/blog/strings-are-dead-long-live-strings
module.exports.tests.analysis = function(test, common) {
  test('index analysis set to keyword', function(t) {
    t.equal(schema.analyzer, 'keyword', 'should be a keyword');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('literal: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
