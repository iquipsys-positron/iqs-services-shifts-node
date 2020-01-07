import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class ShiftsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/shifts');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-shifts', 'controller', 'default', '*', '1.0'));
    }
}