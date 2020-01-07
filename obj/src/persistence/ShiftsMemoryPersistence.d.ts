import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { ShiftV1 } from '../data/version1/ShiftV1';
import { IShiftsPersistence } from './IShiftsPersistence';
export declare class ShiftsMemoryPersistence extends IdentifiableMemoryPersistence<ShiftV1, string> implements IShiftsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ShiftV1>) => void): void;
}
