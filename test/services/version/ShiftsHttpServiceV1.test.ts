let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ShiftV1 } from '../../../src/data/version1/ShiftV1';
import { ShiftsMemoryPersistence } from '../../../src/persistence/ShiftsMemoryPersistence';
import { ShiftsController } from '../../../src/logic/ShiftsController';
import { ShiftsHttpServiceV1 } from '../../../src/services/version1/ShiftsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let SHIFT1: ShiftV1 = {
    id: '1',
    org_id: '1',
    name: 'Test shift 1',
    start: 0,
    duration: 480
};
let SHIFT2: ShiftV1 = {
    id: '2',
    org_id: '1',
    name: 'Test shift 2',
    start: 480,
    duration: 480
};

suite('ShiftsHttpServiceV1', ()=> {    
    let service: ShiftsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new ShiftsMemoryPersistence();
        let controller = new ShiftsController();

        service = new ShiftsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-shifts', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-shifts', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-shifts', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let shift1, shift2;

        async.series([
        // Create one shift
            (callback) => {
                rest.post('/v1/shifts/create_shift',
                    {
                        shift: SHIFT1
                    },
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT1.org_id);
                        assert.equal(shift.start, SHIFT1.start);
                        assert.equal(shift.name, SHIFT1.name);

                        shift1 = shift;

                        callback();
                    }
                );
            },
        // Create another shift
            (callback) => {
                rest.post('/v1/shifts/create_shift', 
                    {
                        shift: SHIFT2
                    },
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT2.org_id);
                        assert.equal(shift.start, SHIFT2.start);
                        assert.equal(shift.name, SHIFT2.name);

                        shift2 = shift;

                        callback();
                    }
                );
            },
        // Get all shifts
            (callback) => {
                rest.post('/v1/shifts/get_shifts',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the shift
            (callback) => {
                shift1.name = 'Updated shift 1';

                rest.post('/v1/shifts/update_shift',
                    { 
                        shift: shift1
                    },
                    (err, req, res, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.name, 'Updated shift 1');
                        assert.equal(shift.id, SHIFT1.id);

                        shift1 = shift;

                        callback();
                    }
                );
            },
        // Delete shift
            (callback) => {
                rest.post('/v1/shifts/delete_shift_by_id',
                    {
                        shift_id: shift1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete shift
            (callback) => {
                rest.post('/v1/shifts/get_shift_by_id',
                    {
                        shift_id: shift1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        assert.isNotNull(result);
                        assert.isTrue(result.deleted);

                        callback();
                    }
                );
            }
        ], done);
    });
});