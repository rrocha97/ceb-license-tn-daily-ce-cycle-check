const sinon = require('sinon');
const { assert } = require('chai');
const { createNewCeCycle } = require('.');
const dbHelper = require('../..');

let knexColumnStub = {};  
let knexSelectStub = {};  
let knexInnerJointStub = {};  
let knexRawStub = {};  
let knexFromStub = {};    
let knexwhereNotNullStub = {};

describe('repositories.createNewCeCycle', () => {
    const boards = [ { CD_BOARD: 'ID_TNCHIRO_BOARD', frecuency: 'DAILY' } ]
    describe('When searchBoards is called ', () => {
        
        beforeEach(() => {
            knexColumnStub  = sinon.stub(dbHelper,'column').returns(dbHelper);
            knexSelectStub  = sinon.stub(dbHelper,'select').returns(dbHelper);
            knexFromStub    = sinon.stub(dbHelper,'from').returns(dbHelper);
            knexInnerJointStub = sinon.stub(dbHelper,'innerJoin').returns(dbHelper);
            knexwhereNotNullStub   = sinon.stub(dbHelper,'whereNotNull').returns(boards);
            
        });
        afterEach(() => {
            knexColumnStub.restore();
            knexSelectStub.restore();
            knexFromStub.restore();
            knexInnerJointStub.restore();
            knexwhereNotNullStub.restore();         
        });
        it('Should be build a query executing select, from,innerJoin, where  functions', async () => {
            await createNewCeCycle.searchBoards();

            assert.equal(knexColumnStub.calledOnce, true);
            assert.equal(knexSelectStub.calledOnce, true);
            assert.equal(knexInnerJointStub.calledOnce, true);
            assert.equal(knexwhereNotNullStub.calledOnce, true);
  
        });

        it('Should returns an array with the right format', async () => {
            const results = await createNewCeCycle.searchBoards();
            assert.deepEqual(results, boards);
        });
        
    });
    describe('When createNewCeCycleFromPrior is called ', () => {
        
        beforeEach(() => {
            knexRawStub  = sinon.stub(dbHelper,'raw');
          
        });
        afterEach(() => {
            knexRawStub.restore();
        });

        it('Should call raw functions', async () => {
            
            await createNewCeCycle.createNewCeCycleFromPrior('00000');

            assert.equal(knexRawStub.calledOnce, true);
        
        });
    });
   
});