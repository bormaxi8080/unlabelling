import {Inject} from "../Inject";
import {Component} from "./Component";
import {Messenger} from "../Messenger";
import {RequestType} from "../../lib/Request/RequestType";
import {StatsRequestPayload} from "../../lib/Request/StatsRequest";
import {StatsResponsePayload} from "../../lib/Request/StatsResponse";
import html from './Stats.html';
import './Stats.less';

@Inject('messenger')
export class Stats extends Component<'Stats'> {

    static readonly type = 'Stats';
    readonly name = Stats.type;
    protected html = html;

    constructor(node: HTMLElement, private messenger: Messenger) {
        super(node);
    }

    init() {
        super.init();
        const counterNode = document.querySelector<HTMLElement>('.c-stats__counter');
        counterNode && this.messenger.query<RequestType.Stats, StatsRequestPayload, StatsResponsePayload>({
            requestType: RequestType.Stats,
            payload: undefined
        }).then(response => {
            if (response && response.inoagentsCount) {
                counterNode.innerText = '' + response.inoagentsCount;
                counterNode.classList.remove('c-stats__counter--loading');
            }
        });
    }

}

