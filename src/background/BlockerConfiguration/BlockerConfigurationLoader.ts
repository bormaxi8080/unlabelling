import {SelectorConfiguration} from "../../lib/SelectorConfiguration";

export interface BlockerConfigurationSelectorsSet {
    domainName: string;
    selectors: SelectorConfiguration[] | undefined;
}

export interface BlockerConfigurationReplacements {
    searchTexts: string[];
    replaceHtml: string;
}

export type BlockerConfigurationSubstitutions = Record<string, string>;

export interface BlockerConfigurationStats {
    inoagentsCount: number;
}

export interface BlockerConfigurationLoaderResult {
    selectors: BlockerConfigurationSelectorsSet[];
    replacements: BlockerConfigurationReplacements;
    substitutions: BlockerConfigurationSubstitutions[];
    stats: BlockerConfigurationStats;
}

export abstract class BlockerConfigurationLoader {

    abstract load(): Promise<BlockerConfigurationLoaderResult>;

}
