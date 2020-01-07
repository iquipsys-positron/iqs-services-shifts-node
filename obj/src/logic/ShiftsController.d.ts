import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ShiftV1 } from '../data/version1/ShiftV1';
import { IShiftsController } from './IShiftsController';
export declare class ShiftsController implements IConfigurable, IReferenceable, ICommandable, IShiftsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getShifts(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ShiftV1>) => void): void;
    getShiftById(correlationId: string, id: string, callback: (err: any, shift: ShiftV1) => void): void;
    createShift(correlationId: string, shift: ShiftV1, callback: (err: any, shift: ShiftV1) => void): void;
    updateShift(correlationId: string, shift: ShiftV1, callback: (err: any, shift: ShiftV1) => void): void;
    deleteShiftById(correlationId: string, id: string, callback: (err: any, shift: ShiftV1) => void): void;
}
