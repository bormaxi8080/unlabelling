import {ElementRewriterType} from "./ElementRewriterType";

export interface SelectorConfiguration {
    selector: string;
    rewriterType?: ElementRewriterType | undefined;
    styleTweaks?: {selector: string, styles: {[key: string]: string}}[];
}