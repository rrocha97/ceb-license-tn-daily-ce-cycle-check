const sinon = require('sinon');
const { assert } = require('chai');
const { carryOVerExemptions } = require('../carryOVerExemptions');
const dbHelper = require('../..');

describe('repositories.carryOVerExemptions', () => {
    let knexSelectStub = {};
    let knexRawStub = {};
    let knexFromStub = {};
    let knexWhereStub = {};

    describe('When searchExemptionPriorCycle is called ', () => {
        const exemptionFound = []

        beforeEach(() => {
            knexSelectStub = sinon.stub(dbHelper, 'select').returns(dbHelper);
            knexFromStub = sinon.stub(dbHelper, 'from').returns(dbHelper);
            knexWhereStub = sinon.stub(dbHelper, 'where').returns(exemptionFound);
        });
        afterEach(() => {
            knexSelectStub.restore();
            knexFromStub.restore();
            knexWhereStub.restore();
        });
        it('Should be build a query executing select, from,innerJoin, where  functions', async () => {
            const s = await carryOVerExemptions.searchExemptionPriorCycle('000009');
            console.log(s);
            assert.equal(knexSelectStub.calledOnce, true);
            assert.equal(knexFromStub.calledOnce, true);
            assert.equal(knexWhereStub.calledOnce, true);
        });

        it('Should returns an array with the right format', async () => {
            const results = await carryOVerExemptions.searchExemptionPriorCycle('000009');
            assert.deepEqual(results, exemptionFound);
        });
    });


    describe('when tiedExemptionNewCycle is called', () => {

        beforeEach(() => {
            knexRawStub = sinon.stub(dbHelper, 'raw').returns([]);
        });
        afterEach(() => {
            knexRawStub.restore();
        });

        it('Should be build a query executing select, from, where, whereIn functions', async () => {
            let lepx = {
                idExemtion: '5',
                idLicensePeriod: '00000010'
            }
            await invalidObjects.buildException(lepx);
            assert.equal(knexRawStub.calledOnce, true);
        });

    });

});