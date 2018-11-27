const config = require('./knexfile.js');
const knex = require('knex')(config);
console.log(config.connection);

const repositories = require('./repositories');

repositories.initialize(knex);
knex.repositories = repositories;

module.exports = knex;
