var Model = require('./base');
var JobPost = require('../models/jobPost');

var SeekerProfile = Model.extend({
    tableName: 'seeker_profile',
    hasTimestamps: false,

  
});

module.exports = SeekerProfile;