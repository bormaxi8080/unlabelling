import {Message} from "./Message";
import {MessageType} from "./MessageType";
import {SelectorConfiguration} from "../SelectorConfiguration";

export interface UpdateSelectorsMessagePayload {
    selectors: SelectorConfiguration[] | undefined;
}

export interface UpdateSelectorsMessage extends Message<MessageType.UpdateSelectors, UpdateSelectorsMessagePayload> {
}
