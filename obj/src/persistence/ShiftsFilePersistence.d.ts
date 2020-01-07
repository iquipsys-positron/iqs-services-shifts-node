import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { ShiftsMemoryPersistence } from './ShiftsMemoryPersistence';
import { ShiftV1 } from '../data/version1/ShiftV1';
export declare class ShiftsFilePersistence extends ShiftsMemoryPersistence {
    protected _persister: JsonFilePersister<ShiftV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
