import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { ShiftsServiceFactory } from '../build/ShiftsServiceFactory';

export class ShiftsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("shifts", "Shifts function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-shifts', 'controller', 'default', '*', '*'));
        this._factories.add(new ShiftsServiceFactory());
    }
}

export const handler = new ShiftsLambdaFunction().getHandler();