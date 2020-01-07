import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class ShiftV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    name: string;
    deleted?: boolean;
    start: number;
    duration: number;
}
