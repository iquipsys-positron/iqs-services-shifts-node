"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ShiftsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/shifts');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-shifts', 'controller', 'default', '*', '1.0'));
    }
}
exports.ShiftsHttpServiceV1 = ShiftsHttpServiceV1;
//# sourceMappingURL=ShiftsHttpServiceV1.js.map