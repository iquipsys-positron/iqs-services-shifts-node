"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const ShiftV1Schema_1 = require("../data/version1/ShiftV1Schema");
class ShiftsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetShiftsCommand());
        this.addCommand(this.makeGetShiftByIdCommand());
        this.addCommand(this.makeCreateShiftCommand());
        this.addCommand(this.makeUpdateShiftCommand());
        this.addCommand(this.makeDeleteShiftByIdCommand());
    }
    makeGetShiftsCommand() {
        return new pip_services3_commons_node_2.Command("get_shifts", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getShifts(correlationId, filter, paging, callback);
        });
    }
    makeGetShiftByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_shift_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('shift_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let shift_id = args.getAsString("shift_id");
            this._logic.getShiftById(correlationId, shift_id, callback);
        });
    }
    makeCreateShiftCommand() {
        return new pip_services3_commons_node_2.Command("create_shift", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('shift', new ShiftV1Schema_1.ShiftV1Schema()), (correlationId, args, callback) => {
            let shift = args.get("shift");
            this._logic.createShift(correlationId, shift, callback);
        });
    }
    makeUpdateShiftCommand() {
        return new pip_services3_commons_node_2.Command("update_shift", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('shift', new ShiftV1Schema_1.ShiftV1Schema()), (correlationId, args, callback) => {
            let shift = args.get("shift");
            this._logic.updateShift(correlationId, shift, callback);
        });
    }
    makeDeleteShiftByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_shift_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('shift_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let shiftId = args.getAsNullableString("shift_id");
            this._logic.deleteShiftById(correlationId, shiftId, callback);
        });
    }
}
exports.ShiftsCommandSet = ShiftsCommandSet;
//# sourceMappingURL=ShiftsCommandSet.js.map