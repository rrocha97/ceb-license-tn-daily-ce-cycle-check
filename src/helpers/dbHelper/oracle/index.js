const config = require('./knexFile.js');
const knex = require('knex')(config);
const repositories = require('./repositories');

repositories.initialize(knex);
knex.repositories = repositories;
console.info('conecting',config)
module.exports = knex;
