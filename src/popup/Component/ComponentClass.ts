import {Component} from "./Component";
import {$inject} from "../Inject";

export interface ComponentClass<T extends Component<any>> extends Function {
    new(node: HTMLElement, ...args: any[]): T;
    type: string;
    [$inject]?: string[];
}
