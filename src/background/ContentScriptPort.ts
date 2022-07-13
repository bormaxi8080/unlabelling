import {MessageType} from "../lib/Message/MessageType";
import {Message} from "../lib/Message/Message";

export interface ContentScriptPort {
    tabId: number;
    sendMessage: <T extends MessageType, M extends Message<T, any>>(message: M) => void;
}
