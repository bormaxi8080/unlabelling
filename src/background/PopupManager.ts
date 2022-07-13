export class PopupManager {

    private static ICON_SIZES = [16, 32, 48, 128];
    private static iconSet = {
        active: PopupManager.buildIconSet(true),
        inactive: PopupManager.buildIconSet(false),
    };

    setActive(isActive: boolean) {
        isActive ? this.activate() : this.deactivate();
    }

    activate() {
        this.setIcon('active');
    }

    deactivate() {
        this.setIcon('inactive');
    }

    private setIcon(isActive: keyof typeof PopupManager.iconSet) {
        browser.browserAction.setIcon({path: PopupManager.iconSet[isActive]}).catch(error => console.error(error));
    }

    private static buildIconSet(isActive: boolean): Record<string, string> {
        return this.ICON_SIZES.reduce((carry, size) => ({
            ...carry,
            [`${size}`]: this.buildIconFilename(isActive, size),
        }), {});
    }

    private static buildIconFilename(isActive: boolean, size: number): string {
        return (isActive ? 'active' : 'inactive') + `_${size}.png`;
    }

}
