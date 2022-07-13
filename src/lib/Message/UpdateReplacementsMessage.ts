import {Message} from "./Message";
import {MessageType} from "./MessageType";

export interface UpdateReplacementsMessagePayload {
    searchTexts: string[];
    replaceHtml: string;
    substitutions: Record<string, string>[];
}

export interface UpdateReplacementsMessage extends Message<MessageType.UpdateReplacements, UpdateReplacementsMessagePayload> {
}
