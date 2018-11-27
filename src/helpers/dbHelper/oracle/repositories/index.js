const { createNewCeCycle } = require('./createNewCeCycle');
const { init : createNewCeCycleInit } = createNewCeCycle;
const { carryOVerExemptions } = require('./carryOVerExemptions');
const { init : carryOVerExemptionsInit } = carryOVerExemptions;


const initialize = (knex) => {

  createNewCeCycleInit(knex)
  carryOVerExemptionsInit(knex)
}
module.exports = {
  initialize,
  createNewCeCycle,
  carryOVerExemptions
};
