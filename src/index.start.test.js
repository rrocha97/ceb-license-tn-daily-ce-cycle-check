const sinon = require('sinon');
const { assert } = require('chai');
const indexModule = require('./');
const schedule = require('node-schedule');
const  worker  = require('./worker');

describe('WORKER.start', () => {
    describe('When calling worker.start()', () => {
        let scheduleStub = {};
        let workerStub = {};

        beforeEach(() => {
            workerStub = sinon.stub(worker, "run");
            scheduleStub = sinon.stub(schedule, "scheduleJob").callsFake(async () => {
                await worker.run();
            });
        });

        afterEach(() => {
            scheduleStub.restore();
            workerStub.restore();
        }); 

        it('Should call schedule.scheduleJob() once', async () => {
            await indexModule.start();
            assert.equal(scheduleStub.calledOnce, true);
        });

    });
});