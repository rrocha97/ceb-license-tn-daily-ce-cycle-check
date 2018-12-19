const worker = require("./index");
const sinon = require('sinon');
const { assert } = require('chai');


describe('testing worker/index', () => {
    let appStub = {};
    let errorStub = {};

    beforeEach(() => {
        errorStub = sinon.stub(console, 'error').callsFake(() => { });
        appStub = sinon.stub(worker, "app");
    });

    afterEach(() => {
        appStub.restore();
        errorStub.restore();
    });

    describe('When run is called', () => {
        
        it('Should call modelModule.app()  once', async () => {
            await worker.run();
            assert.equal(appStub.calledOnce, true);
         
        });

    });
});
