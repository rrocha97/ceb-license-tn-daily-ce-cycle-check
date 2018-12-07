'use strict';
require('dotenv').config();
const  {app}  = require('./app');

const run = async () => {
  try {
    await modelModule.app();
    console.info("Release Done");  
} catch (e) {
    console.error(e.message);
}};

const modelModule = {
  app,
  run
}

module.exports = modelModule;
