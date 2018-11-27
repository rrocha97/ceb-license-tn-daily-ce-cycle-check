const sinon = require('sinon');
const { assert } = require('chai');
const { createNewCeCycle } = require('.');
const dbHelper = require('../..');

describe('repositories.createNewCeCycle', () => {
    let knexColumnStub = {};  
    let knexSelectStub = {};  
    let knexInnerJointStub = {};  
    let knexInsertStub = {};  
    let knexRawStub = {};  
    let knexUpdateStub = {};  
    let knexFromStub = {};    
    let knexWhereStub = {};   

    describe('When searchLicenseExpToday is called ', () => {
        
        const licenseFound = [{
                 ID_USER: 4438260,
                ID_LICENSE_PERIOD_NEW: 18523852,
                ID_LICENSE_PERIOD: 18153158,
                PK_LICENSE: 3574488,
                CD_SCENARIO: 'STANDARD',
                DT_RENEWAL_START: '2017-04-01T05:00:00.000Z',
                DT_RENEWAL_END: '2019-03-31T05:00:00.000Z',
                ID_SCENARIO: null,
                IN_WAIVER_RULE: 0,
                AM_HOURS_REQUIRED: 0,
                AM_HOURS_APPLIED: 0,
                IN_ALLOCATED: 0,
                CD_COMPLIANCE_STATUS: 'IN_PROG',
                DT_MET: null,
                CD_PRAES_ACTIVITY_STATUS: 'ACTIVE',
                CD_PRAES_LICENSE_STATUS: 'ACTIVE',
                ID_ADDED: 9,
                DT_ADDED: '2017-09-22T20:59:05.000Z',
                ID_UPDATED: 42,
                DT_UPDATED: null,
                IN_UPGRADE_PRAES: 0,
                DT_LICENSED_DATE: null,
                CD_INITIAL_METHOD_LIC: null,
                IN_LICENSED_DATE_UPD: null,
                IN_EMPLOYER_SCENARIO: null,
                DT_RENEWAL_START_ORIGINAL: null,
                DT_RENEWAL_START_DISPLAY: null,
                IN_ADDED_BY_HTTP_LOOKUP: 0,
                IN_AUDIT_SELECTED: 0,
                ID_ADDED_AUDIT: null,
                DT_ADDED_AUDIT: null,
                IN_OVERLAPPED_PERIOD: null,
                CD_DISCIPLINARY_TYPE: null,
                CD_COMPLIANCE_AUDIT: null,
                DS_PTCB_NUMBER: null,
                DT_PTCP_EXPIRATION: null,
                IN_VIOLATION_ALABAMA: 0,
                DS_VIOLATION_ALABAMA: null,
                IN_REOCCURS_COMPLETED_TRANSC: 0,
                IN_CREATED_BY_REOCCURRENCE: 0,
                IN_ADDED_MANUALLY: 0,
                DT_LICENSE_LAST_RENEWED: null,
                DS_SPECIALTY: null,
                DT_EXAM_CERT: null,
                DT_RENEWAL_END_ORIGINAL: null,
                DS_TEMP_FIELD: null,
                IN_SCENARIOTYPE_ALLOCATED: 0,
                DT_LICENSE_STATUS_CHG: null,
                IN_CURRENT: 0,
                IN_REPORTED_COMPLETED_CE: null,
                IN_PROCESSED_BY_AUDIT: 0,
                CD_COMPLIANCE_STATUS_CLEARED: null,
                IN_WAIVED_FOR_AUDIT: null,
                IN_FAILED_BY_AUDIT: null,
                IN_PASSED_BY_AUDIT: null,
                IN_LICENSE_REACTIVATION: null,
                IN_DISCIPLINARY_AUDIT_SELECTED: 0,
                IN_PREAUDIT_SELECTED: 0,
                IN_DELINQUENT: null,
                DT_STATUS_DELINQUENT_TO_ACTIVE: null,
                IN_SCENARIO_ALLOCATED: null,
                IN_DASHBOARD_HIDDEN: null,
                DT_DOH_REPORTED: '2017-09-22T20:59:05.000Z',
                CD_AUDIT_COMPL_STATUS: null,
                IN_AUDIT_REVIEWED_BY_BOARD: null,
                IN_TEMP_COMPLIANT_CEATREN: null,
                DT_TEMP_COMPLIANT_CEATREN: null,
                IN_ALLOCATED_BY_SYSTEM: null,
                AM_COMPLETED_PERCENTAGE: 0,
                IN_YES_NO_OUTSTANDING: 0 
        }];


        beforeEach(() => {
            knexColumnStub  = sinon.stub(dbHelper,'column').returns(dbHelper);
            knexSelectStub  = sinon.stub(dbHelper,'select').returns(dbHelper);
            knexFromStub    = sinon.stub(dbHelper,'from').returns(dbHelper);
            knexInnerJointStub = sinon.stub(dbHelper,'innerJoin').returns(dbHelper);
            knexWhereStub   = sinon.stub(dbHelper,'where').returns(licenseFound);
            
        });
        afterEach(() => {
            knexColumnStub.restore();
            knexSelectStub.restore();
            knexFromStub.restore();
            knexInnerJointStub.restore();
            knexWhereStub.restore();         
        });
        it('Should be build a query executing select, from,innerJoin, where  functions', async () => {
           const s = await createNewCeCycle.searchLicenseExpToday();
            console.log(s);
            

            //assert.equal(knexColumnStub.calledOnce, true);
            // assert.equal(knexSelectStub.calledOnce, true);
            // assert.equal(knexFromStub.calledOnce, true);
            // assert.equal(knexWhereStub.calledOnce, true);
  
        });
        // it('Should returns an array with the right format', async () => {
        //     const results = await invalidObjects.search();
        //     assert.deepEqual(results, searchResults);
        // });
        
    });

    // describe('when buildInvalidScript is called',() => {
    //     const script = 'alter PACKAGE HEALTHQA.PKG_TEST compile';
    //     it('Should return a Script',async()=>{
    //         const results = await invalidObjects.buildInvalidScript(data);
    //         assert.deepEqual(results, script);
    //     });
    // });

    // describe('when buildException is called',()=>{
    //     const resultexception =[{
    //         line:'',
    //         text:''
    //     }];
    //     const modelexception =[{
    //         line:'',
    //         text:''
    //     }];

    //     beforeEach(() => {
    //         knexSelectStub  = sinon.stub(dbHelper,'select').returns(dbHelper);
    //         knexFromStub    = sinon.stub(dbHelper,'from').returns(dbHelper);
    //         knexWhereStub   = sinon.stub(dbHelper,'where').returns(resultexception);
    //     });
    //     afterEach(() => {
    //         knexSelectStub.restore(); 
    //         knexFromStub.restore();   
    //         knexWhereStub.restore();  
    //     });
        
    //     it('Should be build a query executing select, from, where, whereIn functions', async () => {
    //         await invalidObjects.buildException(data);
    //         assert.equal(knexSelectStub.calledOnce, true);
    //         assert.equal(knexFromStub.calledOnce, true);
    //         assert.equal(knexWhereStub.calledOnce, true);
            
    //     });
    //     it('Should returns an array with the right format',async()=>{
    //         const results = await invalidObjects.buildException(data);
    //         assert.deepEqual(results, modelexception);
    //     });
    // });
});