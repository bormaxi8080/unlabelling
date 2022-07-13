import {Response} from "./Response";
import {RequestType} from "./RequestType";

export interface StatsResponsePayload {
    inoagentsCount: number;
}

export interface StatsResponse extends Response<RequestType.Stats, StatsResponsePayload> {
}
