import {MessageHandler} from "./MessageHandler";
import {Message} from "../Message/Message";
import {MessageType} from "../Message/MessageType";

export class MessageHandlerQueue {

    private readonly handlersMap: Map<MessageType, MessageHandler<any, any, any>>;
    private readonly queue: Message<any, any>[] = [];

    private isRunning = false;

    constructor(...handlers: MessageHandler<any, any, any>[]) {
        this.handlersMap = handlers.reduce((map, handler) => {
            map.set(handler.messageType, handler);
            return map;
        }, new Map);
    }

    isKnownMessageType(messageType: MessageType) {
        return this.handlersMap.has(messageType);
    }

    run() {
        if (this.isRunning || !this.queue.length) {
            return;
        }

        const runLoop = () => {
            this.isRunning = true;
            this.runNext().finally(() => {
                if (this.queue.length) {
                    runLoop();
                } else {
                    this.isRunning = false;
                }
            });
        };

        runLoop();
    }

    private async runNext(): Promise<void> {
        const message = this.queue.shift();
        if (!message) {
            return;
        }
        try {
            const handler = this.handlersMap.get(message.type);
            if (handler) {
                const result = await handler.execute(message.payload);
                if (result?.length) {
                    this.queue.push(...result);
                }
            } else {
                console.error(`Handler not found for "${message.type}"`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    push(...messages: Message<any, any>[]) {
        this.queue.push(...messages);
        this.run();
    }

}
