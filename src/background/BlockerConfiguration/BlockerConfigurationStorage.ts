import {BlockerConfigurationLoaderResult} from "./BlockerConfigurationLoader";

export class BlockerConfigurationStorage {

    private static STORAGE_KEY = 'config';

    async store(loaderResult: BlockerConfigurationLoaderResult): Promise<void> {
        await browser.storage.local.set({
            [BlockerConfigurationStorage.STORAGE_KEY]: JSON.stringify(loaderResult)
        });
    }

    async load(): Promise<BlockerConfigurationLoaderResult | undefined> {
        const loaderResult = await browser.storage.local.get([BlockerConfigurationStorage.STORAGE_KEY]);
        if (loaderResult && loaderResult[BlockerConfigurationStorage.STORAGE_KEY]) {
            try {
                return JSON.parse(loaderResult[BlockerConfigurationStorage.STORAGE_KEY]);
            } catch {
                return undefined;
            }
        }
        return undefined;
    }

}
