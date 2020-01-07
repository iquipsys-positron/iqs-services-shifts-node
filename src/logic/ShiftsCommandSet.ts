import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { ShiftV1 } from '../data/version1/ShiftV1';
import { ShiftV1Schema } from '../data/version1/ShiftV1Schema';
import { IShiftsController } from './IShiftsController';

export class ShiftsCommandSet extends CommandSet {
    private _logic: IShiftsController;

    constructor(logic: IShiftsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetShiftsCommand());
		this.addCommand(this.makeGetShiftByIdCommand());
		this.addCommand(this.makeCreateShiftCommand());
		this.addCommand(this.makeUpdateShiftCommand());
		this.addCommand(this.makeDeleteShiftByIdCommand());
    }

	private makeGetShiftsCommand(): ICommand {
		return new Command(
			"get_shifts",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getShifts(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetShiftByIdCommand(): ICommand {
		return new Command(
			"get_shift_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('shift_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let shift_id = args.getAsString("shift_id");
                this._logic.getShiftById(correlationId, shift_id, callback);
            }
		);
	}

	private makeCreateShiftCommand(): ICommand {
		return new Command(
			"create_shift",
			new ObjectSchema(true)
				.withRequiredProperty('shift', new ShiftV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let shift = args.get("shift");
                this._logic.createShift(correlationId, shift, callback);
            }
		);
	}

	private makeUpdateShiftCommand(): ICommand {
		return new Command(
			"update_shift",
			new ObjectSchema(true)
				.withRequiredProperty('shift', new ShiftV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let shift = args.get("shift");
                this._logic.updateShift(correlationId, shift, callback);
            }
		);
	}
	
	private makeDeleteShiftByIdCommand(): ICommand {
		return new Command(
			"delete_shift_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('shift_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let shiftId = args.getAsNullableString("shift_id");
                this._logic.deleteShiftById(correlationId, shiftId, callback);
			}
		);
	}

}