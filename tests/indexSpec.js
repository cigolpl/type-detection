'use strict';

var should = require('should');
var helper = require('./../index');
var _ = require('lodash')
var faker = require('faker')

describe('configuration', function() {

  it('should detect field type', function test(done) {

    var type = helper.detectFieldType('81.36, 16.40');
    type.should.be.equal('geo')

    var type = helper.detectFieldType({
      longitude: '81.36',
      latitude: '16.40'
    });
    type.should.be.equal('geo')

    var type = helper.detectFieldType(81.36);
    type.should.be.equal('float')

    var type = helper.detectFieldType(false);
    type.should.be.equal('boolean')

    var type = helper.detectFieldType('06/22/2015');
    type.should.be.equal('date')

    var type = helper.detectFieldType(faker.lorem.words(30));
    type.should.be.equal('text')

    var type = helper.detectFieldType('email@domain.com');
    type.should.be.equal('email')

    var type = helper.detectFieldType('http://google.com');
    type.should.be.equal('url')

    var type = helper.detectFieldType('www.google.com');
    type.should.be.equal('url')

    var type = helper.detectFieldType('192.168.0.1');
    type.should.be.equal('ip')

    done();
  });

  it('should detect fields (rows) type', function test(done) {
    var type = helper.detectFieldsType(['a', 'a,b,c,d', 'c']);
    type.should.be.equal('array')

    var type = helper.detectFieldsType(['a', 'a', 'c']);
    type.should.be.equal('repeatable_string')

    var type = helper.detectFieldsType(['a', 'b', 'c']);
    type.should.be.equal('string')

    var type = helper.detectFieldsType(['a', 'b', 'c', '', '', '']);
    type.should.be.equal('string')

    var type = helper.detectFieldsType(['joe@domain.com', 'joe2@domain.com']);
    type.should.be.equal('email')

    var type = helper.detectFieldsType(['81.36, 16.40']);
    type.should.be.equal('geo')

    var type = helper.detectFieldsType(['192.168.0.1', '192.168.0.1']);
    type.should.be.equal('ip')

    done()
  })


  it('rows to single array', function test(done) {
    var data = [{
      tags: 'a'
    }, {
      tags: 'a,b,c,d'
    }, {
      tags: 'c'
    }, {
      tags: undefined
    }]

    var singleArray = helper.rowsToSingleArray(_.map(data, 'tags'))
    singleArray.length.should.be.equal(6)
    done()
  })

});
