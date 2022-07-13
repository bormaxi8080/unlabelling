import {MessageHandler} from "../../lib/MessageHandler/MessageHandler";
import {MessageType} from "../../lib/Message/MessageType";
import {UpdateReplacementsMessage, UpdateReplacementsMessagePayload} from "../../lib/Message/UpdateReplacementsMessage";
import {TextReplacer} from "../Dom/ElementRewriter/TextReplacer";

export class UpdateReplacementsHandler extends MessageHandler<MessageType.UpdateReplacements, UpdateReplacementsMessagePayload, UpdateReplacementsMessage> {

    readonly messageType = MessageType.UpdateReplacements;

    constructor(private readonly textReplacer: TextReplacer) {
        super();
    }

    async execute(payload: UpdateReplacementsMessagePayload): Promise<void> {
        this.textReplacer.configure(payload.searchTexts, payload.replaceHtml, payload.substitutions);
    }

}
