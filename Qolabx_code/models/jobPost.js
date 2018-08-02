var Model = require('./base');
var UserAccount=require('../models/userAccount');
var JobType=require('../models/jobType');
var Company=require('../models/company');
var JobPostSkill=require('../models/jobPostSkill');
var JobPost = Model.extend({
    tableName: 'job_post',
    hasTimestamps: false,

user:function()
{
    return this.belongsTo(UserAccount,'user_id');
},

job_type:function()
{
    return this.belongsTo(JobType,'job_type_id');
},

company:function()
{
    return this.belongsTo(Company,'company_id');
},


  
});

module.exports = JobPost;