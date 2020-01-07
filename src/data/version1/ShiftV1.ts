import { IStringIdentifiable } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';

export class ShiftV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public name: string;
    public deleted?: boolean;

    public start: number; // In minutes from 00:00
    public duration: number; // In minutes
}