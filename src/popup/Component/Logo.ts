import {Component} from "./Component";
import './Logo.less';
import html from './Logo.html';

export class Logo extends Component<'Logo'> {

    static readonly type = 'Logo';
    readonly name = Logo.type;
    protected html = html;

    constructor(node: HTMLElement) {
        super(node);
    }

    init(): void {
        super.init();
    }

}

