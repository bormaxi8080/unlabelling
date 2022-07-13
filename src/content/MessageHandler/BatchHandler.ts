import {MessageHandler} from "../../lib/MessageHandler/MessageHandler";
import {MessageType} from "../../lib/Message/MessageType";
import {BatchMessage, BatchMessagePayload} from "../../lib/Message/BatchMessage";
import {Message} from "../../lib/Message/Message";

export class BatchHandler extends MessageHandler<MessageType.Batch, BatchMessagePayload, BatchMessage> {

    readonly messageType = MessageType.Batch;

    async execute(payload: BatchMessagePayload): Promise<Message<any, any>[]> {
        return payload;
    }

}