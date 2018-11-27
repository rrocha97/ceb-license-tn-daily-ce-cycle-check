'use strict';
require('dotenv').config();
const { dbHelper } = require('./helpers');
const { oracleDB: oDBConnection} = dbHelper;

const { app } = require('./app');

const process = async () => {
  try {

   await modelModule.app();
    console.log("Release Done");
  } catch (e) {
    console.error(e.message);
   
  } finally {
    if(oDBConnection) oDBConnection.destroy();
  }
};




const modelModule = {
  app,
  process,
}
modelModule.process();
module.exports = modelModule;
