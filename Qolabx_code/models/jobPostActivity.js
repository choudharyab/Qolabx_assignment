var Model = require('./base');
var JobPost = require('../models/jobPost');


var JobPostActivity = Model.extend({
    tableName: 'job_post_activity',
    hasTimestamps: false,

    job_post:function()
    {
        return this.belongsTo(JobPost,'job_post_id');
    }
    
});

module.exports = JobPostActivity;