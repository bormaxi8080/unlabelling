import {Request} from "./Request";
import {RequestType} from "./RequestType";

export type IsEnabledRequestPayload = boolean | undefined;

export interface IsEnabledRequest extends Request<RequestType.IsEnabled, IsEnabledRequestPayload> {
}
