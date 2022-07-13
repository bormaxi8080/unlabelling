import {Component} from "./Component";
import './Root.less';
import html from './Root.html';

export class Root extends Component<'Root'> {

    static readonly type = 'Root';
    readonly name = Root.type;
    protected html = html;

    constructor(node: HTMLElement) {
        super(node);
    }

    init() {
        super.init();
    }

}
