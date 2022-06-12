
export default interface RouletteContainer<T> {
    selectRandom(): T | null,
    deselect(object: T): void,
    enable(object: T): void,
    disable(object: T): void,
    deselectAll(): void,
    enableAll(): void,
    disableAll(): void
}