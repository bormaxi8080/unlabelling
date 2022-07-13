import {Component} from "./Component/Component";
import {ComponentClass} from "./Component/ComponentClass";
import {$inject} from "./Inject";

export class Application {

    private readonly controllers: Record<string, ComponentClass<Component<any>>>;

    constructor(private dependencies: Record<string, any>, controllers: Array<ComponentClass<Component<any>>>) {
        this.controllers = controllers.reduce((controllers, controller) => ({
            ...controllers,
            [controller.type]: controller,
        }), {});
    }

    start() {
        this.process(document.documentElement);
    }

    process(node: HTMLElement) {
        const queue: HTMLElement[] = [node];
        while (queue.length) {
            const node = queue.pop()!;
            for (const child of node.querySelectorAll<HTMLElement>(Component.SELECTOR)) {
                const type = child.dataset[Component.DATASET_KEY];
                if (type && type in this.controllers) {
                    const ctrl = this.constructCtor(this.controllers[type], child);
                    ctrl.init();
                    queue.push(child);
                }
            }
        }
    }

    private constructCtor(ctor: ComponentClass<Component<any>>, node: HTMLElement): Component<any> {
        const args = (ctor[$inject] || []).map(injection => this.dependencies[injection]);
        return new ctor(node, ...args);
    }

}
