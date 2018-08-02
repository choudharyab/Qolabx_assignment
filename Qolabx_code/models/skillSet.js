var Model = require('./base');
var JobPost = require('../models/jobPost');

var SkillSet = Model.extend({
    tableName: 'skill_set',
    hasTimestamps: false,

  
});

module.exports = SkillSet;