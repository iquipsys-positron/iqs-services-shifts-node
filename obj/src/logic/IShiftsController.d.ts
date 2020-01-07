import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ShiftV1 } from '../data/version1/ShiftV1';
export interface IShiftsController {
    getShifts(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ShiftV1>) => void): void;
    getShiftById(correlationId: string, shift_id: string, callback: (err: any, shift: ShiftV1) => void): void;
    createShift(correlationId: string, shift: ShiftV1, callback: (err: any, shift: ShiftV1) => void): void;
    updateShift(correlationId: string, shift: ShiftV1, callback: (err: any, shift: ShiftV1) => void): void;
    deleteShiftById(correlationId: string, shift_id: string, callback: (err: any, shift: ShiftV1) => void): void;
}
