export abstract class Component<T extends string> {

    public static readonly DATASET_KEY = 'use';
    private static readonly CLASS_NAME_PREFIX = 'c-';

    public static get SELECTOR() {
        return '[data-' + this.DATASET_KEY + ']';
    }

    readonly abstract name: T;
    protected abstract html: string;
    private _className: string | undefined;

    // noinspection JSUnusedGlobalSymbols
    protected constructor(protected node: HTMLElement) {
    }

    init(): void {
        this.node.classList.add(this.className);
        this.node.innerHTML = this.html;

        this.initEventHandlers();
        this.initI18n();
    }

    protected initEventHandlers() {
        for (const node of this.node.querySelectorAll<HTMLElement>('[data-on]')) {
            for (const [eventName, fnName] of Component.parseEventHandlersConfig(node.dataset['on'] as string)) {
                node.addEventListener(eventName, event => {
                    if (undefined === (this as any)[fnName](event, node)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            }
        }
    }

    protected initI18n() {
        for (const node of this.node.querySelectorAll<HTMLElement>('[data-msg]')) {
            const tokens = node.dataset['msg']!.split('|');
            const msgKey = tokens.shift()!;
            const translation = browser.i18n.getMessage(msgKey, tokens);
            if (!translation) {
                node.innerText = '[' + msgKey + ']';
                continue;
            }
            if (msgKey.endsWith('HTML')) {
                node.innerHTML = translation;
            } else {
                node.innerText = translation;
            }
        }
    }

    private static parseEventHandlersConfig(cfg: string): Array<[string, string]> {
        return cfg.split(/[\s,;]+/).map(item => item.split(':', 2)).filter(item => item.length === 2) as any;
    }

    protected get className(): string {
        return this._className ?? (this._className = Component.CLASS_NAME_PREFIX + this.name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-'));
    }

}
