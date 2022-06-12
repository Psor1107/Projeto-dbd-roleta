import getRandomItem from "../functions/getRandomItem.js";
import removeItem from "../functions/removeItem.js";
import RouletteContainer from "../interfaces/RouletteContainer.js";

export default class IndependentRouletteContainer<T> 
implements RouletteContainer<T> {
    private objects: T[]
    private availableObjects: T[]  // Deve conter apenas objetos não selecionados e habilitados
    private enabledObjects: T[]  // Deve conter todos os objetos que estão habilitados
    private selectedObjects: T[]  // Deve conter todos os objetos que estão selecionados

    public constructor(objects: T[]) {
        this.objects = objects
        this.availableObjects = [...objects]
        this.enabledObjects = [...objects]
        this.selectedObjects = []
    }

    private throwErrorIfObjectDoesNotExistsInContainer(object: T): void {
        if (!this.objects.includes(object)) {
            throw new Error(`Objeto ${object} não é um item do container.`)
        }
    }

    public isAvailable(object: T) {
        return this.availableObjects.includes(object)
    }

    public isEnabled(object: T) {
        return this.enabledObjects.includes(object)
    }

    public isSelected(object: T) {
        return this.selectedObjects.includes(object)
    }

    public selectRandom(): T | null {
        if (!this.availableObjects) {
            return null
        }
        const randomItem = getRandomItem(this.availableObjects)
        removeItem(this.availableObjects, randomItem)
        this.selectedObjects.push(randomItem)
        return randomItem
    }

    public deselect(object: T): void {
        this.throwErrorIfObjectDoesNotExistsInContainer(object)

        removeItem(this.selectedObjects, object)
        if (this.isEnabled(object)) {
            this.availableObjects.push(object)
        }
    }

    public enable(object: T): void {
        this.throwErrorIfObjectDoesNotExistsInContainer(object)

        if (!this.isEnabled(object)) {
            this.enabledObjects.push(object)
        }
        if (!this.isAvailable(object) && !this.isSelected(object)) {
            this.availableObjects.push(object)
        }
    }

    public disable(object: T): void {
        this.throwErrorIfObjectDoesNotExistsInContainer(object)

        if (this.isEnabled(object)) {
            removeItem(this.enabledObjects, object)
        }
        if (this.isAvailable(object)) {
            removeItem(this.availableObjects, object)
        }
    }

    public deselectAll(): void {
        for (let selectedObject of this.selectedObjects) {
            this.deselect(selectedObject)
        }
    }

    public enableAll(): void {
        for (let object of this.objects) {
            this.enable(object)
        }
    }

    public disableAll(): void {
        for (let enabledObject of this.enabledObjects) {
            this.disable(enabledObject)
        }
    }
}