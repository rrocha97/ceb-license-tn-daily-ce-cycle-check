const sinon = require('sinon');
const { assert } = require('chai');
const elasticSearchModule = require("./elasticSearch");

let elasticSearchStub = {};
let searchLicenseStub = {};

let resultLicense =
{
    "took": 6,
    "timed_out": false,
    "_shards": {
        "total": 79,
        "successful": 79,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 1,
        "max_score": 10.751671,
        "hits": [{
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
    }
}


describe('repositories.elasticSearch', () => {

    describe('When searchLicensesGroupedByBoard is called ', () => {

        beforeEach(() => {
            elasticSearchStub = sinon.stub(elasticSearchModule.elasticSearchClient, 'search').returns(resultLicense);
            searchLicenseStub = sinon.stub(elasticSearchModule, 'searchLicenses').returns(resultLicense);
        });
        afterEach(() => {
            elasticSearchStub.restore();
            searchLicenseStub.restore();

        });
        it('Should call to searchLicenses once', async () => {
            await elasticSearchModule.searchLicensesGroupedByBoard('47');
            assert.equal(searchLicenseStub.calledOnce, true);
        });
        it('if not found licnese should return null', async () => {
            searchLicenseStub.returns({hits:{total:0}})
            let result = await elasticSearchModule.searchLicensesGroupedByBoard('47');

            assert.equal(result, null);
        });
    });
    describe('When searchLicenses is called ', () => {

        beforeEach(() => {
            elasticSearchStub = sinon.stub(elasticSearchModule.elasticSearchClient, 'search').returns(resultLicense);
        });
        afterEach(() => {
            elasticSearchStub.restore();
        });

        it('Should call search functions', async () => {
            await elasticSearchModule.searchLicenses('47');
            assert.equal(elasticSearchStub.calledOnce, true);

        });
    });

});