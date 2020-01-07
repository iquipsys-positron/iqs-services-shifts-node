import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ShiftsMongoDbPersistence } from '../persistence/ShiftsMongoDbPersistence';
import { ShiftsFilePersistence } from '../persistence/ShiftsFilePersistence';
import { ShiftsMemoryPersistence } from '../persistence/ShiftsMemoryPersistence';
import { ShiftsController } from '../logic/ShiftsController';
import { ShiftsHttpServiceV1 } from '../services/version1/ShiftsHttpServiceV1';

export class ShiftsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-shifts", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-shifts", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-shifts", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-shifts", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-shifts", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-shifts", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ShiftsServiceFactory.MemoryPersistenceDescriptor, ShiftsMemoryPersistence);
		this.registerAsType(ShiftsServiceFactory.FilePersistenceDescriptor, ShiftsFilePersistence);
		this.registerAsType(ShiftsServiceFactory.MongoDbPersistenceDescriptor, ShiftsMongoDbPersistence);
		this.registerAsType(ShiftsServiceFactory.ControllerDescriptor, ShiftsController);
		this.registerAsType(ShiftsServiceFactory.HttpServiceDescriptor, ShiftsHttpServiceV1);
	}
	
}
