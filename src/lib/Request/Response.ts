import {RequestType} from "./RequestType";

export interface Response<T extends RequestType, P> {
    responseType: T;
    payload: P;
}
