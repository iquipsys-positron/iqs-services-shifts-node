let ShiftsProcess = require('../obj/src/container/ShiftsProcess').ShiftsProcess;

try {
    new ShiftsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
