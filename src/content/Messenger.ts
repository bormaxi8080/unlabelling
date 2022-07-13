import {MessageHandlerQueue} from "../lib/MessageHandler/MessageHandlerQueue";
import {Runtime} from "webextension-polyfill";

export class Messenger {

    private port?: Runtime.Port;

    constructor(private readonly handlerQueue: MessageHandlerQueue) {
    }

    listen() {
        if (this.port) {
            return;
        }
        this.port = browser.runtime.connect();
        this.port.onMessage.addListener(message => {
            if ('type' in message && 'payload' in message && this.handlerQueue.isKnownMessageType(message.type)) {
                this.handlerQueue.push(message);
            }
        });
    }

}
