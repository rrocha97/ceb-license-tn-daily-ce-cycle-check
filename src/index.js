'use strict';
require('dotenv').config();
const schedule = require('node-schedule');
const  worker  = require('./worker');

const start = async () => {
    schedule.scheduleJob(process.env.SCHEDULE_TIME, worker.run);

};

const indexModule = {
  start
}
indexModule.start();
module.exports = indexModule;
