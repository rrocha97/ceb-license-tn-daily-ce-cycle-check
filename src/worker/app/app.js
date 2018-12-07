const { oracleDB, elasticSearch } = require('../../helpers/dbHelper');
const { createNewCeCycle } = oracleDB.repositories;
const moment = require('moment');

const validateRunReport = (frecuency) => {
    try {
        let run_report = false;
        switch (frecuency) {
            case 'DAILY':
                run_report = true;
                break;
            case 'SUNDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'SUNDAY');
                break;
            case 'MONDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'MONDAY');
                break;
            case 'TUESDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'TUESDAY');
                break;
            case 'WEDNESDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'WEDNESDAY');
                break;
            case 'THURSDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'THURSDAY');
                break;
            case 'FRIDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'FRIDAY');
                break;
            case 'SATURDAY':
                run_report = (moment().format('dddd').toUpperCase() == 'SATURDAY');
                break;
            default:
                if (frecuency.match(/^DAY_[0-9]+_MONTH$/g).length > 0) {
                    run_report = (moment().format('MM/DD/YYYY') == frecuency.match(/[0-9]+/g));
                }
                break;
        };

        return run_report;

    } catch (error) {
        console.error(`VALIDATOR_ERROR: ${error.message}`);
    }

};


const app = async () => {
    try {
        const dateini = new Date();
        let boardsFrequecy = await createNewCeCycle.searchBoards();
        if (!boardsFrequecy) return;
        
        for (const board of boardsFrequecy) {
            if (!await appModule.validateRunReport(board.frecuency)) continue;
            
            let licenses = await elasticSearch.searchLicensesGroupedByBoard(board.ID_BOARD)
            if (!licenses) continue;
            console.info('licenses processed', licenses.length)

            for (const license of licenses) {
                await createNewCeCycle.createNewCeCycleFromPrior(license._source.currentPeriod.id);
            }
        }
        const datefin = new Date();
        console.info((datefin - dateini) / 1000);
        return;
    } catch (error) {
        console.error(error.message);
    }
};

const appModule = {
    app,
    validateRunReport
};

module.exports = appModule;
