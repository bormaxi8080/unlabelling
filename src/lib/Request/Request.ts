import {RequestType} from "./RequestType";

export interface Request<T extends RequestType, P> {
    requestType: T;
    payload: P;
}
