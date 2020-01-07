let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { ShiftV1 } from '../data/version1/ShiftV1';
import { IShiftsPersistence } from '../persistence/IShiftsPersistence';
import { IShiftsController } from './IShiftsController';
import { ShiftsCommandSet } from './ShiftsCommandSet';

export class ShiftsController implements  IConfigurable, IReferenceable, ICommandable, IShiftsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-shifts:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ShiftsController._defaultConfig);
    private _persistence: IShiftsPersistence;
    private _commandSet: ShiftsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IShiftsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ShiftsCommandSet(this);
        return this._commandSet;
    }
    
    public getShifts(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ShiftV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getShiftById(correlationId: string, id: string, 
        callback: (err: any, shift: ShiftV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createShift(correlationId: string, shift: ShiftV1, 
        callback: (err: any, shift: ShiftV1) => void): void {
        this._persistence.create(correlationId, shift, callback);
    }

    public updateShift(correlationId: string, shift: ShiftV1, 
        callback: (err: any, shift: ShiftV1) => void): void {
        this._persistence.update(correlationId, shift, callback);
    }

    public deleteShiftById(correlationId: string, id: string,
        callback: (err: any, shift: ShiftV1) => void): void {  
        let oldObject: ShiftV1;
        let newObject: ShiftV1;

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
