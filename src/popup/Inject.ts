import "reflect-metadata";

export const $inject = Symbol.for('$inject');

export function Inject(...inject: string[]) {
    return (constructor: Function) => {
        Object.assign(constructor, {[$inject]: inject});
    }
}
