import {BlockerConfigurationLoader, BlockerConfigurationLoaderResult} from "./BlockerConfigurationLoader";

export class BlockerConfigurationFetchLoader extends BlockerConfigurationLoader {

    constructor(private fetchUrl: string) {
        super();
    }

    async load(): Promise<BlockerConfigurationLoaderResult> {
        const url = new URL(this.fetchUrl);
        url.searchParams.set('*no-cache*', `${Date.now()}`);
        const result = await fetch(url.toString());
        if (!result.ok) {
            throw new Error('Failed to load config');
        }
        const config = await result.json();
        if (!config['selectors'] || !config['replacements'] || !config['stats']) {
            throw new Error('Malformed config loaded');
        }
        return config as BlockerConfigurationLoaderResult;
    }

}
