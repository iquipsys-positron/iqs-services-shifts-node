import { ConfigParams } from 'pip-services3-commons-node';

import { ShiftsFilePersistence } from '../../src/persistence/ShiftsFilePersistence';
import { ShiftsPersistenceFixture } from './ShiftsPersistenceFixture';

suite('ShiftsFilePersistence', ()=> {
    let persistence: ShiftsFilePersistence;
    let fixture: ShiftsPersistenceFixture;
    
    setup((done) => {
        persistence = new ShiftsFilePersistence('./data/shifts.test.json');

        fixture = new ShiftsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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