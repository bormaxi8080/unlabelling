import {DomWatcher} from "./Dom/DomWatcher";
import {MessageHandlerQueue} from "../lib/MessageHandler/MessageHandlerQueue";
import {UpdateSelectorsHandler} from "./MessageHandler/UpdateSelectorsHandler";
import {ElementProcessor} from "./Dom/ElementProcessor";
import {TextReplacer} from "./Dom/ElementRewriter/TextReplacer";
import {Messenger} from "./Messenger";
import {UpdateReplacementsHandler} from "./MessageHandler/UpdateReplacementsHandler";
import {BatchHandler} from "./MessageHandler/BatchHandler";

const textReplacer = new TextReplacer();

const elementProcessor = new ElementProcessor(
    textReplacer,
);

const domWatcher = new DomWatcher(elementProcessor);

const handlerQueue = new MessageHandlerQueue(
    new BatchHandler(),
    new UpdateSelectorsHandler(domWatcher),
    new UpdateReplacementsHandler(textReplacer),
);

const messenger = new Messenger(handlerQueue);
messenger.listen();