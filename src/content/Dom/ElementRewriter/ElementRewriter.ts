import {ElementRewriterType} from "../../../lib/ElementRewriterType";

export abstract class ElementRewriter<T extends ElementRewriterType> {

    abstract readonly type: T;

    abstract rewrite(element: Element): Element | void;

}