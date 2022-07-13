import {Message} from "../lib/Message/Message";
import {MessageType} from "../lib/Message/MessageType";
import {TabsListener} from "./TabsListener";
import {Runtime} from "webextension-polyfill";
import {Response} from "../lib/Request/Response";

export class Messenger {

    constructor(private readonly tabsListener: TabsListener) {
    }

    listen() {
        browser.runtime.onConnect.addListener(this.onPortConnected.bind(this));
        browser.runtime.onMessage.addListener(this.onMessage.bind(this));
    }

    private onPortConnected(port: Runtime.Port) {
        const tabId = port.sender?.tab?.id;
        if (!tabId) {
            return;
        }
        this.tabsListener.onPortConnected({
            tabId,
            sendMessage: this.sendMessageToPort.bind(this, port),
        }, port.sender?.tab?.url);
    }

    sendMessageToPort<T extends MessageType, M extends Message<T, any>>(port: Runtime.Port, message: M) {
        port.postMessage(message);
    }

    private async onMessage(message: any) {
        if (!(typeof message?.requestType === 'string')) {
            return;
        }
        const methodName = 'onRequest' + message.requestType;
        if (typeof ((this.tabsListener as any)[methodName]) !== 'function') {
            return;
        }
        try {
            const responsePayload: any = await (this.tabsListener as any)[methodName](message.payload);
            if (responsePayload !== undefined) {
                const response: Response<any, any> = {
                    responseType: message.requestType,
                    payload: responsePayload,
                };
                return response;
            }
        } catch (e) {
            console.error(e);
        }
    }

}
