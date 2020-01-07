"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const ShiftsCommandSet_1 = require("./ShiftsCommandSet");
class ShiftsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ShiftsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ShiftsCommandSet_1.ShiftsCommandSet(this);
        return this._commandSet;
    }
    getShifts(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getShiftById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createShift(correlationId, shift, callback) {
        this._persistence.create(correlationId, shift, callback);
    }
    updateShift(correlationId, shift, callback) {
        this._persistence.update(correlationId, shift, callback);
    }
    deleteShiftById(correlationId, id, callback) {
        let oldObject;
        let newObject;
        async.series([
            // Get shift
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    oldObject = data;
                    callback(err);
                });
            },
            // Set logical deletion flag
            (callback) => {
                if (oldObject == null) {
                    callback();
                    return;
                }
                newObject = _.clone(oldObject);
                newObject.deleted = true;
                this._persistence.update(correlationId, newObject, (err, data) => {
                    newObject = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, err == null ? newObject : null);
        });
    }
}
exports.ShiftsController = ShiftsController;
ShiftsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-shifts:persistence:*:*:1.0');
//# sourceMappingURL=ShiftsController.js.map