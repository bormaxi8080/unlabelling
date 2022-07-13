import {MessageHandler} from "../../lib/MessageHandler/MessageHandler";
import {MessageType} from "../../lib/Message/MessageType";
import {UpdateSelectorsMessage, UpdateSelectorsMessagePayload} from "../../lib/Message/UpdateSelectorsMessage";
import {DomWatcher} from "../Dom/DomWatcher";

export class UpdateSelectorsHandler extends MessageHandler<MessageType.UpdateSelectors, UpdateSelectorsMessagePayload, UpdateSelectorsMessage> {

    readonly messageType = MessageType.UpdateSelectors;

    constructor(private readonly domWatcher: DomWatcher) {
        super();
    }

    async execute(payload: UpdateSelectorsMessagePayload): Promise<void> {
        this.domWatcher.updateSelectors(payload.selectors);
    }

}