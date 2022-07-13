import {MessageType} from "../Message/MessageType";
import {Message} from "../Message/Message";

export abstract class MessageHandler<T extends MessageType, P, M extends Message<T, P>> {

    abstract readonly messageType: MessageType;

    abstract execute(payload: P): Promise<Message<any, any>[] | void>;

}