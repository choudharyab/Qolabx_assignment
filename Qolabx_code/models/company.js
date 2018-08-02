var Model = require('./base');

var Company = Model.extend({
    tableName: 'company',
    hasTimestamps: false,

   
});

module.exports = Company;