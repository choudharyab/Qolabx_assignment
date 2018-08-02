var Model = require('./base');
var JobPost = require('../models/jobPost');

var SeekerSkill = Model.extend({
    tableName: 'seeker_skill_set',
    hasTimestamps: false,

  
});

module.exports = SeekerSkill;