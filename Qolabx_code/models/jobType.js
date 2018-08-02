var Model = require('./base');


var JobType = Model.extend({
    tableName: 'job_type',
    hasTimestamps: false,

    
});

module.exports = JobType;