var knex = {
	client: 'mysql',
	connection: {
		host     : '127.0.0.1',
	    user     : 'root',
	    password : '',
		database : 'db_job_database'
    },
    migrations: {
        tableName: 'knex_migrations'
	},
	pool: { min: 0, max: 7 }
	
};

module.exports = knex;
