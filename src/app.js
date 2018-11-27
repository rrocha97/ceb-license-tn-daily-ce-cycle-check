const { oracleDB } = require('./helpers/dbHelper');
const { createNewCeCycle, carryOVerExemptions } = oracleDB.repositories;
const moment = require('moment');

const calculateNewCycle = async (renewalEnd, codeEvalCeExpDate) => {
  const renewalStart = moment(renewalEnd).add(1, 'd').format();
  if (codeEvalCeExpDate === 'EOY_CURRENT') {
    renewalEnd = moment(renewalEnd).add(1, 'y').format();
  } else if (codeEvalCeExpDate === 'EOY_EVEN') {
    renewalEnd = moment(renewalEnd).add(2, 'y').format();
  }
  return {
    renewalStart,
    renewalEnd
  };
};

const createLicensePeriod = async license => {
  await createNewCeCycle.insertLicensePeriod(license);
  const scenario = await createNewCeCycle.getCdScenariolp(license.ID_LICENSE_PERIOD_NEW);
  await createNewCeCycle.updateLicensePeriod(license, scenario[0].TYPE);
  await createNewCeCycle.updateLicense(license);
  await createNewCeCycle.insertLicenseExpirationDateXref(license);
};

const carryOVerExemption = async license => {
  const exemptionsPriorcycle = await carryOVerExemptions.searchExemptionPriorCycle(license.ID_LICENSE_PERIOD);
  if (!exemptionsPriorcycle) return;
  for (const exemptionPriorcycle of exemptionsPriorcycle) {
    let lepx = {
      idExemtion: exemptionPriorcycle.ID_EXEMPTION,
      idLicensePeriod: license.ID_LICENSE_PERIOD_NEW
    };
    await carryOVerExemptions.tiedExemptionNewCycle(lepx);
  }
};

const app = async () => {
  try {
    const dateini = new Date();

    let boardsFrequecy = await createNewCeCycle.searchBoards();
    for (const board of boardsFrequecy) {
      let licenses = await createNewCeCycle.searchLicenseExpToday(board.CD_BOARD);

      for (const license of licenses) {
        newCycle = await appModule.calculateNewCycle(license.DT_RENEWAL_END,license.CD_EVAL_CE_EXP_DATE);
        license.DT_RENEWAL_START = newCycle.renewalStart;
        license.DT_RENEWAL_END = newCycle.renewalEnd;
        await appModule.createLicensePeriod(license)
        await appModule.carryOVerExemption(license)
        await createNewCeCycle.scheduleEvents(license);
      }
    }

    const datefin = new Date();
    console.log((datefin - dateini) / 1000);
  } catch (error) {
    console.log(error.message);
  }
};

const appModule = {
  app,
  createLicensePeriod,
  carryOVerExemption,
  calculateNewCycle

};

module.exports = appModule;
