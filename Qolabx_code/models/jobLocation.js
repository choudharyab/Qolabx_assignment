var Model = require('./base');
var JobPost = require('../models/jobPost');

var JobLocation = Model.extend({
    tableName: 'job_location',
    hasTimestamps: false,

  job_get:function()
  {
  return this.belongsTo(JobPost,'job_post_id');
  }
});

module.exports = JobLocation;