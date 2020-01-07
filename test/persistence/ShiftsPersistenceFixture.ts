let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ShiftV1 } from '../../src/data/version1/ShiftV1';

import { IShiftsPersistence } from '../../src/persistence/IShiftsPersistence';

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
let SHIFT3: ShiftV1 = {
    id: '3',
    org_id: '2',
    name: 'Test shift 3',
    start: 0,
    duration: 720
};

export class ShiftsPersistenceFixture {
    private _persistence: IShiftsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateShifts(done) {
        async.series([
        // Create one shift
            (callback) => {
                this._persistence.create(
                    null,
                    SHIFT1,
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT1.org_id);
                        assert.equal(shift.start, SHIFT1.start);
                        assert.equal(shift.name, SHIFT1.name);

                        callback();
                    }
                );
            },
        // Create another shift
            (callback) => {
                this._persistence.create(
                    null,
                    SHIFT2,
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT2.org_id);
                        assert.equal(shift.start, SHIFT2.start);
                        assert.equal(shift.name, SHIFT2.name);

                        callback();
                    }
                );
            },
        // Create yet another shift
            (callback) => {
                this._persistence.create(
                    null,
                    SHIFT3,
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.org_id, SHIFT3.org_id);
                        assert.equal(shift.start, SHIFT3.start);
                        assert.equal(shift.name, SHIFT3.name);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let shift1: ShiftV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateShifts(callback);
            },
        // Get all shifts
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        shift1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the shift
            (callback) => {
                shift1.name = 'Updated shift 1';

                this._persistence.update(
                    null,
                    shift1,
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isObject(shift);
                        assert.equal(shift.name, 'Updated shift 1');
                        assert.equal(shift.id, shift1.id);

                        callback();
                    }
                );
            },
        // Delete shift
            (callback) => {
                this._persistence.deleteById(
                    null,
                    shift1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete shift
            (callback) => {
                this._persistence.getOneById(
                    null,
                    shift1.id,
                    (err, shift) => {
                        assert.isNull(err);

                        assert.isNull(shift || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create shifts
            (callback) => {
                this.testCreateShifts(callback);
            },
        // Get shifts filtered by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, shifts) => {
                        assert.isNull(err);

                        assert.isObject(shifts);
                        assert.lengthOf(shifts.data, 2);

                        callback();
                    }
                );
            },
        // Get shifts filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: 'test'
                    }),
                    new PagingParams(),
                    (err, shifts) => {
                        assert.isNull(err);

                        assert.isObject(shifts);
                        assert.lengthOf(shifts.data, 3);

                        callback();
                    }
                );
            },
        ], done);
    }

}
