import { ConfigParams } from 'pip-services3-commons-node';

import { ShiftsMemoryPersistence } from '../../src/persistence/ShiftsMemoryPersistence';
import { ShiftsPersistenceFixture } from './ShiftsPersistenceFixture';

suite('ShiftsMemoryPersistence', ()=> {
    let persistence: ShiftsMemoryPersistence;
    let fixture: ShiftsPersistenceFixture;
    
    setup((done) => {
        persistence = new ShiftsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ShiftsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});