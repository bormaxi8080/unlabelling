import {Request} from "./Request";
import {RequestType} from "./RequestType";

export type StatsRequestPayload = undefined;

export interface StatsRequest extends Request<RequestType.Stats, StatsRequestPayload> {
}
