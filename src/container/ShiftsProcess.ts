import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { ShiftsServiceFactory } from '../build/ShiftsServiceFactory';

export class ShiftsProcess extends ProcessContainer {

    public constructor() {
        super("shifts", "Shifts microservice");
        this._factories.add(new ShiftsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
