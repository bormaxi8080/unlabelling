import {Component} from "./Component";
import './ToggleEnabled.less';
import html from './ToggleEnabled.html';
import {Inject} from "../Inject";
import {Messenger} from "../Messenger";
import {RequestType} from "../../lib/Request/RequestType";
import {IsEnabledRequestPayload} from "../../lib/Request/IsEnabledRequest";
import {IsEnabledResponsePayload} from "../../lib/Request/IsEnabledResponse";

@Inject('messenger')
export class ToggleEnabled extends Component<'ToggleEnabled'> {

    static readonly type = 'ToggleEnabled';
    readonly name = ToggleEnabled.type;
    protected html = html;
    private toggleNode: HTMLElement | undefined = undefined;

    private isEnabled: boolean | undefined;
    private static IS_ENABLED_CLASSES = ['c-toggle-enabled__toggle--disabled', 'c-toggle-enabled__toggle--enabled'];

    constructor(node: HTMLElement, private messenger: Messenger) {
        super(node);
    }

    init(): void {
        super.init();

        const toggleNode = this.node.querySelector<HTMLElement>('.c-toggle-enabled__toggle');
        if (!toggleNode) {
            throw new Error('toggleNode not found');
        }
        this.toggleNode = toggleNode;

        this.queryIsEnabled();
    }

    queryIsEnabled(payload: boolean | undefined = undefined) {
        this.messenger.query<RequestType.IsEnabled, IsEnabledRequestPayload, IsEnabledResponsePayload>({
            requestType: RequestType.IsEnabled,
            payload,
        }).then(result => {
            result === undefined || this.setIsEnabled(result);
        });
    }

    private setIsEnabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
        this.toggleNode!.classList.remove(ToggleEnabled.IS_ENABLED_CLASSES[+!isEnabled]);
        this.toggleNode!.classList.add(ToggleEnabled.IS_ENABLED_CLASSES[+isEnabled]);
    }

    // noinspection JSUnusedGlobalSymbols
    onToggle() {
        if (this.isEnabled === undefined) {
            throw new Error('Not initialized');
        }
        this.queryIsEnabled(!this.isEnabled);
    }

    turnOn() {
        if (this.isEnabled === undefined) {
            throw new Error('Not initialized');
        }
        this.isEnabled || this.queryIsEnabled(true);
    }

    turnOff() {
        if (this.isEnabled === undefined) {
            throw new Error('Not initialized');
        }
        !this.isEnabled || this.queryIsEnabled(false);
    }

}
