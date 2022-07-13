import {ElementRewriter} from "./ElementRewriter/ElementRewriter";
import {DEFAULT_ELEMENT_REWRITER_TYPE, ElementRewriterType} from "../../lib/ElementRewriterType";

export class ElementProcessor {

    private readonly rewritersMap: Map<ElementRewriterType, ElementRewriter<any>>;

    constructor(...rewriters: ElementRewriter<any>[]) {
        this.rewritersMap = rewriters.reduce((map, rewriter) => {
            map.set(rewriter.type, rewriter);
            return map;
        }, new Map);
    }

    process(element: Element, rewriterType: ElementRewriterType | undefined): Element | void {
        const rewriter = this.rewritersMap.get(rewriterType || DEFAULT_ELEMENT_REWRITER_TYPE);
        if (!rewriter) {
            console.error(`Unknown rewriter type: '${rewriterType}'`);
            return;
        }
        return rewriter.rewrite(element);
    }

}
