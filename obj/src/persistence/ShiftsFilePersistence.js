"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_data_node_1 = require("pip-services3-data-node");
const ShiftsMemoryPersistence_1 = require("./ShiftsMemoryPersistence");
class ShiftsFilePersistence extends ShiftsMemoryPersistence_1.ShiftsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ShiftsFilePersistence = ShiftsFilePersistence;
//# sourceMappingURL=ShiftsFilePersistence.js.map