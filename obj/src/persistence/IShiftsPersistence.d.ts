import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { ShiftV1 } from '../data/version1/ShiftV1';
export interface IShiftsPersistence extends IGetter<ShiftV1, string>, IWriter<ShiftV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ShiftV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: ShiftV1) => void): void;
    create(correlationId: string, item: ShiftV1, callback: (err: any, item: ShiftV1) => void): void;
    update(correlationId: string, item: ShiftV1, callback: (err: any, item: ShiftV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: ShiftV1) => void): void;
}
