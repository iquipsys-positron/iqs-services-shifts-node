"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class ShiftV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('deleted', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withRequiredProperty('start', pip_services3_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('duration', pip_services3_commons_node_2.TypeCode.Integer);
    }
}
exports.ShiftV1Schema = ShiftV1Schema;
//# sourceMappingURL=ShiftV1Schema.js.map