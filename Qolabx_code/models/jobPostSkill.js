var Model = require('./base');
var JobPost = require('../models/jobPost');
var SkillSet=require('../models/skillSet');

var JobPostSkill = Model.extend({
    tableName: 'job_post_skill_set',
    hasTimestamps: false,

    job_posts:function()
    {
        return this.belongsTo(JobPost,'job_post_id');
    },

    skill_set:function()
    {
        return this.belongsTo(SkillSet,'skill_set_id');
    }
    
});

module.exports = JobPostSkill;