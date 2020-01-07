"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const ShiftsServiceFactory_1 = require("../build/ShiftsServiceFactory");
class ShiftsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("shifts", "Shifts microservice");
        this._factories.add(new ShiftsServiceFactory_1.ShiftsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ShiftsProcess = ShiftsProcess;
//# sourceMappingURL=ShiftsProcess.js.map