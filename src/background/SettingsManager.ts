import {AppSettings} from "./AppSettings";
import {PopupManager} from "./PopupManager";

export class SettingsManager {

    private settings: AppSettings | undefined;

    private static STORAGE_KEY = 'settings';

    private static DEFAULTS: AppSettings = {
        isEnabled: true,
    };

    constructor(private popupManager: PopupManager) {
    }

    async load(): Promise<void> {
        let storageResult = await browser.storage.local.get(SettingsManager.STORAGE_KEY);
        let settings = Object.assign({}, SettingsManager.DEFAULTS);
        if (storageResult && storageResult[SettingsManager.STORAGE_KEY]) {
            try {
                let storedSettings = storageResult[SettingsManager.STORAGE_KEY];
                Object.assign(settings, storedSettings);
            } catch {
                // pass
            }
        }
        this.init(settings);
    }

    private init(settings: AppSettings) {
        this.settings = settings;
        this.popupManager.setActive(this.settings.isEnabled);
    }

    async store(): Promise<void> {
        if (!this.settings) {
            throw new Error('Not loaded');
        }
        await browser.storage.local.set({[SettingsManager.STORAGE_KEY]: this.settings});
    }

    async setIsEnabled(isEnabled: boolean): Promise<boolean> {
        if (this.get().isEnabled === isEnabled) {
            return false;
        }
        await this.set({isEnabled});
        this.popupManager.setActive(isEnabled);
        return true;
    }

    private async set(settings: Partial<AppSettings>): Promise<void> {
        if (!this.settings) {
            throw new Error('Not loaded');
        }
        Object.assign(this.settings, settings);
        await this.store();
    }

    get(): AppSettings {
        if (!this.settings) {
            throw new Error('Not loaded');
        }
        return this.settings;
    }

    get isEnabled(): boolean {
        return this.get().isEnabled;
    }

}
