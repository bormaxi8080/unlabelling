import {Response} from "./Response";
import {RequestType} from "./RequestType";

export type IsEnabledResponsePayload = boolean;

export interface IsEnabledResponse extends Response<RequestType.IsEnabled, IsEnabledResponsePayload> {
}
