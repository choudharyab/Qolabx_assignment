var Model = require('./base');


var UserAccount = Model.extend({
    tableName: 'user_account',
    hasTimestamps: false,

   
});

module.exports = UserAccount;