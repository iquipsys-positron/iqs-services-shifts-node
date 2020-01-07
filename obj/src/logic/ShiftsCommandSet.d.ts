import { CommandSet } from 'pip-services3-commons-node';
import { IShiftsController } from './IShiftsController';
export declare class ShiftsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IShiftsController);
    private makeGetShiftsCommand;
    private makeGetShiftByIdCommand;
    private makeCreateShiftCommand;
    private makeUpdateShiftCommand;
    private makeDeleteShiftByIdCommand;
}
