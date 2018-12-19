const { createNewCeCycle } = require('./createNewCeCycle');
const { init : createNewCeCycleInit } = createNewCeCycle;



const initialize = (knex) => {
  createNewCeCycleInit(knex)
}
module.exports = {
  initialize,
  createNewCeCycle
};
