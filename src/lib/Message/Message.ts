import {MessageType} from "./MessageType";

export interface Message<T extends MessageType, P> {
    type: T;
    payload: P;
}