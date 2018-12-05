const sinon = require('sinon');
const appModule = require("./app");
const { assert } = require('chai');
const { oracleDB, elasticSearch } = require('../helpers/dbHelper');
const { createNewCeCycle } = oracleDB.repositories;
const moment = require('moment');

let validateRunReportStub = {};
let searchBoardstub = {};
let searchLicensesGroupedByBoardStub = {};
let createNewCeCycleFromPriorStub = {};
let errorStub;

const boards = [{ CD_BOARD: 'ID_TNCHIRO_BOARD', frecuency: 'DAILY' }]
let licenses = [{
    "_index": "424",
    "_type": "licenses",
    "_id": "3943083",
    "_score": 10.751671,
    "_source": {
        "id": 3943083,
        "number": "S.0004110",
        "issuedDate": "04/09/1988",
        "licenseId": "0004110",
        "expireFromPraes": "04/09/2020",
        "boardId": 424,
        "owner": {
            "id": 5584299,
            "fullName": "KATHLEEN N STARR",
            "firstName": "KATHLEEN",
            "lastName": "STARR",
            "middleName": "N",
            "email": "cebrokersendgridrecipient@gmail.com",
            "emailAlternative": "cebrokersendgridrecipient@gmail.com",
            "account": null
        },
        "profession": {
            "name": "Licensed Social Worker",
            "code": "S",
            "id": 1937,
            "board": {
                "id": 424,
                "name": "Ohio Counselor, Social Worker and Marriage and Family Therapist Board",
                "state": {
                    "id": 7,
                    "code": "OH",
                    "name": "Ohio"
                }
            }
        },
        "currentPeriod": {
            "id": 28346146,
            "renewalStartDate": "08/24/2018",
            "renewalStartDisplay": null,
            "renewalEndDate": "04/09/2020",
            "complianceStatus": "IN_PROG",
            "isAuditSelected": 0,
            "addedToAuditDate": null,
            "cycleType": "STANDARD",
            "activityStatus": "ACTIVE",
            "licenseStatus": "ACTIVE",
            "formattedStatus": "Active",
            "isEmployerScenario": null,
            "isRenewalCycle": 1,
            "isFirstRenewalCycle": 0,
            "licenseExpirationDate": "04/09/2020",
            "isCurrentPeriod": 0,
            "licenseLastRenewedDate": "08/23/2018",
            "hoursRequired": 30,
            "hoursApplied": 0,
            "completedPercentage": 0,
            "isCnaCycle": "0",
            "isTemporaryCompliance": "0",
            "isYesNoOutstanding": 0,
            "reportedExemptions": [],
            "scenario": {
                "id": 9221,
                "name": "Licensed Social Worker",
                "code": "STANDARD",
                "isNoCeRequired": 0
            }
        },
        "licenseLastRenewedDate": "08/23/2018",
        "periods": [{
            "id": 25917112,
            "renewalStartDate": "04/10/2016",
            "renewalStartDisplay": null,
            "renewalEndDate": "08/23/2018",
            "complianceStatus": "IN_PROG",
            "isAuditSelected": 0,
            "addedToAuditDate": null,
            "cycleType": "STANDARD",
            "activityStatus": "ACTIVE",
            "licenseStatus": "ACTIVE",
            "formattedStatus": "Active",
            "isEmployerScenario": null,
            "isRenewalCycle": 1,
            "isFirstRenewalCycle": 1,
            "licenseExpirationDate": "04/09/2020",
            "isCurrentPeriod": 0,
            "licenseLastRenewedDate": "04/08/2016",
            "hoursRequired": 30,
            "hoursApplied": 0,
            "completedPercentage": 0,
            "isCnaCycle": "0",
            "isTemporaryCompliance": "0",
            "isYesNoOutstanding": 0,
            "reportedExemptions": [],
            "scenario": {
                "id": 9221,
                "name": "Licensed Social Worker",
                "code": "STANDARD",
                "isNoCeRequired": 0
            }
        }, {
            "id": 28346146,
            "renewalStartDate": "08/24/2018",
            "renewalStartDisplay": null,
            "renewalEndDate": "04/09/2020",
            "complianceStatus": "IN_PROG",
            "isAuditSelected": 0,
            "addedToAuditDate": null,
            "cycleType": "STANDARD",
            "activityStatus": "ACTIVE",
            "licenseStatus": "ACTIVE",
            "formattedStatus": "Active",
            "isEmployerScenario": null,
            "isRenewalCycle": 1,
            "isFirstRenewalCycle": 0,
            "licenseExpirationDate": "04/09/2020",
            "isCurrentPeriod": 1,
            "licenseLastRenewedDate": "08/23/2018",
            "hoursRequired": 30,
            "hoursApplied": 0,
            "completedPercentage": 0,
            "isCnaCycle": "0",
            "isTemporaryCompliance": "0",
            "isYesNoOutstanding": 0,
            "reportedExemptions": [],
            "scenario": {
                "id": 9221,
                "name": "Licensed Social Worker",
                "code": "STANDARD",
                "isNoCeRequired": 0
            }
        }
        ],
        "currentLicenseStatus": "Active"
    }
}
]


describe('testing worker/app', () => {
    describe('When app is called', () => {
        beforeEach(() => {
            validateRunReportStub = sinon.stub(appModule, 'validateRunReport').returns(true);
            searchBoardstub = sinon.stub(createNewCeCycle, "searchBoards").returns(boards);
            searchLicensesGroupedByBoardStub = sinon.stub(elasticSearch, "searchLicensesGroupedByBoard").returns(licenses);
            createNewCeCycleFromPriorStub = sinon.stub(createNewCeCycle, "createNewCeCycleFromPrior").returns([]);
            errorStub = sinon.stub(console, 'error');

        });

        afterEach(() => {
            validateRunReportStub.restore();
            searchBoardstub.restore();
            searchLicensesGroupedByBoardStub.restore();
            createNewCeCycleFromPriorStub.restore();
            errorStub.restore()
        });

        it('Should call appModule.validateRunReport() once', async () => {
            await appModule.app();
            assert.equal(validateRunReportStub.calledOnce, true);
        });

        it('Should call createNewCeCycle.searchBoards() once', async () => {
            await appModule.app();
            assert.equal(searchBoardstub.calledOnce, true);
        });

        it('Should call elasticSearch.searchLicensesGroupedByBoard() once', async () => {
            await appModule.app();
            assert.equal(searchLicensesGroupedByBoardStub.calledOnce, true);
        });
        it('Should call oracleDB.createNewCeCycleFromPriorStub() once', async () => {
            await appModule.app();
            assert.equal(createNewCeCycleFromPriorStub.calledOnce, true);
        });
        it('if occurs some error should be call console.error', async () => {
            searchBoardstub.returns({ds:'sa'});
            await appModule.app();
            assert.equal(errorStub.calledOnce, true);
        });
        it('if searchBoardstub not found board should be null', async () => {
            searchBoardstub.returns();
            restult = await appModule.app();
            assert.equal(restult, null);
        });
        it('if searchLicensesGroupedByBoard not found board should be null', async () => {
            searchLicensesGroupedByBoardStub.returns();
            restult = await appModule.app();
            assert.equal(restult, null);
        });
    });
    describe('When validateRunReport is called', () => {
        beforeEach(() => {
            errorStub = sinon.stub(console, 'error');
        });

        afterEach(() => {
            errorStub.restore()
        });
        it('if is daily should return true', async () => {
            let result = await appModule.validateRunReport('DAILY');
            assert.equal(result, true);
        });
        it('if send invalid params should be call console.error', async () => {
            await appModule.validateRunReport('11DAILY');
            assert.equal(errorStub.calledOnce, true);
        });
        it('if is a spesific day should return true', async () => {
            let result = await appModule.validateRunReport(moment().format('dddd').toUpperCase());
            assert.equal(result, true);
        });
    });
});
