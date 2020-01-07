"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const ShiftsServiceFactory_1 = require("../build/ShiftsServiceFactory");
class ShiftsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("shifts", "Shifts function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-shifts', 'controller', 'default', '*', '*'));
        this._factories.add(new ShiftsServiceFactory_1.ShiftsServiceFactory());
    }
}
exports.ShiftsLambdaFunction = ShiftsLambdaFunction;
exports.handler = new ShiftsLambdaFunction().getHandler();
//# sourceMappingURL=ShiftsLambdaFunction.js.map