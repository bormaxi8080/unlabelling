import {Message} from "./Message";
import {MessageType} from "./MessageType";

export type BatchMessagePayload = Message<any, any>[];

export interface BatchMessage extends Message<MessageType.Batch, BatchMessagePayload> {
}
