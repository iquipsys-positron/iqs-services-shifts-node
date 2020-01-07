"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const ShiftsMongoDbPersistence_1 = require("../persistence/ShiftsMongoDbPersistence");
const ShiftsFilePersistence_1 = require("../persistence/ShiftsFilePersistence");
const ShiftsMemoryPersistence_1 = require("../persistence/ShiftsMemoryPersistence");
const ShiftsController_1 = require("../logic/ShiftsController");
const ShiftsHttpServiceV1_1 = require("../services/version1/ShiftsHttpServiceV1");
class ShiftsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ShiftsServiceFactory.MemoryPersistenceDescriptor, ShiftsMemoryPersistence_1.ShiftsMemoryPersistence);
        this.registerAsType(ShiftsServiceFactory.FilePersistenceDescriptor, ShiftsFilePersistence_1.ShiftsFilePersistence);
        this.registerAsType(ShiftsServiceFactory.MongoDbPersistenceDescriptor, ShiftsMongoDbPersistence_1.ShiftsMongoDbPersistence);
        this.registerAsType(ShiftsServiceFactory.ControllerDescriptor, ShiftsController_1.ShiftsController);
        this.registerAsType(ShiftsServiceFactory.HttpServiceDescriptor, ShiftsHttpServiceV1_1.ShiftsHttpServiceV1);
    }
}
exports.ShiftsServiceFactory = ShiftsServiceFactory;
ShiftsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "factory", "default", "default", "1.0");
ShiftsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "persistence", "memory", "*", "1.0");
ShiftsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "persistence", "file", "*", "1.0");
ShiftsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "persistence", "mongodb", "*", "1.0");
ShiftsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "controller", "default", "*", "1.0");
ShiftsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-shifts", "service", "http", "*", "1.0");
//# sourceMappingURL=ShiftsServiceFactory.js.map