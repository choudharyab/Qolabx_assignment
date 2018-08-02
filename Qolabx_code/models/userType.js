var Model = require('./base');


var UserType = Model.extend({
    tableName: 'user_type',
    hasTimestamps: false,

    
});

module.exports = UserType;