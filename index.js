'use strict';
var _ = require('lodash')
var moment = require('moment')
var mail = require('mailchecker');

var DATE_FORMATS = [
  moment.ISO_8601,
  'MM/DD/YYYY'
];

exports.rowsToSingleArray = function(rows) {
  return _.chain(rows)
  .filter(_.isString)
  .map(function(o) {
    return _.map(o.split(','), function(val) {
      return val.trim();
    })
  })
  .flatten()
  .value()
}

/**
 * arguments list should be refactored soon
 */
exports.detectFieldType = function(val) {
  if (Number(val) === val && val % 1 !== 0) {
    //http://stackoverflow.com/a/1830844/659682
    return 'float'
  } else if (val === false || val === true) {
    return 'boolean'
  } else if (_.isString(val) && val.match(/([+-]?\d+(\.\d+)?)\s*\,\s*([+-]?\d+(\.\d+)?)/)) {
    return 'geo'
  } else if (_.isPlainObject(val) && val.latitude && val.longitude) {
    return 'geo'
  } else if (_.isString(val) && val.match(/\.(jpg|png|gif|jpeg)/)) {
    return 'image'
  } else if (_.isString(val) && val.match(/\.(pdf|doc|docx)/)) {
    return 'file'
  } else if (_.isNumber(val)) {
    //http://stackoverflow.com/a/1830844/659682
    return 'integer'
  } else if (_.isArray(val)) {
    return 'array'
  } else if (moment(val, DATE_FORMATS, true).isValid()) {
    //http://stackoverflow.com/a/30870755/659682
    return 'date'
  } else if (_.isString(val) && val.length >= 100) {
    return 'text'
  } else if (_.isString(val) && mail.isValid(val)) {
    return 'email'
  } else if (_.isString(val)) {
    var tags = _.map(val.split(','), function(val) {
      return val.trim();
    })

    var filter = _.filter(tags, function(val) {
      return val.length <= 15
    })

    if (tags.length > 1 && filter.length === tags.length) {
      return 'array'
    }

    return 'string'
  }
}

exports.detectFieldsType = function(rows) {
  var val = _.head(rows)

  if (_.isString(val)) {
    if (_.isArray(rows)) {
      // if value is too long then string (not array)
      for (var i = 0 ; i < rows.length ; ++i) {
        if (_.isString(rows[i]) && rows[i].length > 100) {
          return 'string'
        }
      }

      var singleArray = exports.rowsToSingleArray(rows)
      var countBy = _.chain(singleArray)
      // ignore elements which are empty
      .filter(function(o) {
        return o.length >= 1
      })
      .countBy()
      .values()
      .sortBy()
      .reverse()
      .value();

      // if values are repeatable
      if (countBy.length >= 1 && countBy[0] > 1) {
        for (var i = 0 ; i < rows.length ; ++i) {
          if (_.isString(rows[i]) && rows[i].split(',').length > 1) {
            return 'array'
          }
        }
        return 'repeatable_string'
      }
    }
  }

  return exports.detectFieldType(val)
}

module.exports = exports;
