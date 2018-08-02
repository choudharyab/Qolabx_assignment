var knex = require('knex')(require('../db/knexfile'));

var bookshelf = require('bookshelf') (knex);
//bookshelf.plugin(require('bookshelf-eloquent'));
//bookshelf.plugin('registry');
module.exports = bookshelf;