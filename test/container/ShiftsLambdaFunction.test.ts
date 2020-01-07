let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ShiftV1 } from '../../src/data/version1/ShiftV1';
import { ShiftsMemoryPersistence } from '../../src/persistence/ShiftsMemoryPersistence';
import { ShiftsController } from '../../src/logic/ShiftsController';
import { ShiftsLambdaFunction } from '../../src/container/ShiftsLambdaFunction';

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

suite('ShiftsLambdaFunction', ()=> {
    let lambda: ShiftsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-shifts:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-shifts:controller:default:default:1.0'
        );

        lambda = new ShiftsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var shift1, shift2;

        async.series([
        // Create one shift
            (callback) => {
                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'create_shift',
                        shift: SHIFT1
                    },
                    (err, shift) => {
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
                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'create_shift',
                        shift: SHIFT2
                    },
                    (err, shift) => {
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
                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'get_shifts' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'update_shift',
                        shift: shift1
                    },
                    (err, shift) => {
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
                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'delete_shift_by_id',
                        shift_id: shift1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete shift
            (callback) => {
                lambda.act(
                    {
                        role: 'shifts',
                        cmd: 'get_shift_by_id',
                        shift_id: shift1.id
                    },
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isNotNull(shift);
                        assert.isTrue(shift.deleted);

                        callback();
                    }
                );
            }
        ], done);
    });
});