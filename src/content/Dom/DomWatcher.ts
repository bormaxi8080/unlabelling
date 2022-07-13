import {ElementProcessor} from "./ElementProcessor";
import {SelectorConfiguration} from "../../lib/SelectorConfiguration";

export class DomWatcher {

    private static readonly IGNORE_TAGS = new Set(['br', 'nobr', 'head', 'link', 'meta', 'script', 'style']);

    private mutationObserver: MutationObserver | undefined;
    private selectors: SelectorConfiguration[] | undefined;
    private readonly addedNodes: Set<Element> = new Set();
    private readonly processedNodes: Set<Element> = new Set();

    constructor(private readonly elementProcessor: ElementProcessor) {
    }

    updateSelectors(selectors: SelectorConfiguration[] | undefined) {
        this.selectors = selectors?.length ? selectors : undefined;
        if (this.selectors) {
            if (!this.mutationObserver) {
                this.scanNodes([document.documentElement]);
                this.start();
            }
        } else {
            this.stop();
        }
    }

    private start() {
        if (this.mutationObserver) {
            return;
        }
        this.addedNodes.clear();
        this.processedNodes.clear();
        this.mutationObserver = new MutationObserver(this.observe.bind(this));
        this.mutationObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }

    private stop() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        this.mutationObserver = undefined;
        this.addedNodes.clear();
        this.processedNodes.clear();
    }

    private observe(mutations: MutationRecord[]) {
        let hasAddedNodes = false;
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && !this.isProcessedElement(node as Element)) {
                    this.addedNodes.add(node as Element);
                    hasAddedNodes = true;
                }
            }
            for (const node of mutation.removedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    this.processedNodes.delete(node as Element);
                }
            }
        }

        if (!hasAddedNodes) {
            return;
        }

        requestAnimationFrame(() => this.processAddedNodes());
    }

    private isProcessedElement(element: Element): boolean {
        if (this.processedNodes.has(element)) {
            return true;
        }
        for (let processedNode of this.processedNodes) {
            if (processedNode.contains(element)) {
                return true;
            }
        }
        return false;
    }

    private processAddedNodes() {
        if (!this.addedNodes.size) {
            return;
        }

        const nodes = Array.from(this.addedNodes);
        this.addedNodes.clear();

        this.scanNodes(nodes);
    }

    private scanNodes(nodes: Element[]) {
        const nodesToProcess: Map<Element, SelectorConfiguration> = new Map();
        nodes.forEach(node => this.scan(node, nodesToProcess));

        for (const [node, selectorConfig] of nodesToProcess.entries()) {
            this.processNode(node, selectorConfig);
        }
    }

    private processNode(node: Element, selectorConfig: SelectorConfiguration) {
        this.processedNodes.add(node);
        this.applyStyleTweaks(selectorConfig);
        const marker = this.elementProcessor.process(node, selectorConfig.rewriterType);
        marker && this.observeProcessedNode(node, marker);
    }

    private applyStyleTweaks(selectorConfig: SelectorConfiguration) {
        selectorConfig.styleTweaks?.forEach(tweak => {
            const elements = document.documentElement.querySelectorAll<HTMLElement>(tweak.selector);
            elements.forEach(element => Object.assign(element.style, tweak.styles));
        });
    }

    private observeProcessedNode(node: Element, marker: Element) {
        const observer = new MutationObserver(() => {
            if (node.parentNode?.contains(node) && !node.contains(marker)) {
                observer.disconnect();
                this.addedNodes.add(node);
                this.processAddedNodes();
            }
        });
        observer.observe(node, {
            characterData: true,
            childList: true,
            subtree: true,
        });
    }

    private scan(node: Node, nodesToProcess: Map<Element, SelectorConfiguration>) {
        if (!this.selectors) {
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        const element = <Element>node;
        if (DomWatcher.IGNORE_TAGS.has(element.localName)) {
            return;
        }
        const addNodeToProcess = (element: Element, selectorConfig: SelectorConfiguration) => {
            nodesToProcess.has(element) || nodesToProcess.set(element, selectorConfig);
        };
        for (const selectorConfig of this.selectors) {
            if (element.matches(selectorConfig.selector)) {
                addNodeToProcess(element, selectorConfig);
            } else {
                const matches = element.querySelectorAll(selectorConfig.selector);
                if (matches) {
                    for (const match of matches) {
                        addNodeToProcess(match, selectorConfig);
                    }
                }
            }
        }
    }

}
