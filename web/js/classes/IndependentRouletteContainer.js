import getRandomItem from "../functions/getRandomItem.js";
import removeItem from "../functions/removeItem.js";
export default class IndependentRouletteContainer {
    constructor(objects) {
        this.objects = objects;
        this.availableObjects = [...objects];
        this.enabledObjects = [...objects];
        this.selectedObjects = [];
    }
    throwErrorIfObjectDoesNotExistsInContainer(object) {
        if (!this.objects.includes(object)) {
            throw new Error(`Objeto ${object} não é um item do container.`);
        }
    }
    isAvailable(object) {
        return this.availableObjects.includes(object);
    }
    isEnabled(object) {
        return this.enabledObjects.includes(object);
    }
    isSelected(object) {
        return this.selectedObjects.includes(object);
    }
    selectRandom() {
        if (!this.availableObjects) {
            return null;
        }
        const randomItem = getRandomItem(this.availableObjects);
        removeItem(this.availableObjects, randomItem);
        this.selectedObjects.push(randomItem);
        return randomItem;
    }
    deselect(object) {
        this.throwErrorIfObjectDoesNotExistsInContainer(object);
        removeItem(this.selectedObjects, object);
        if (this.isEnabled(object)) {
            this.availableObjects.push(object);
        }
    }
    enable(object) {
        this.throwErrorIfObjectDoesNotExistsInContainer(object);
        if (!this.isEnabled(object)) {
            this.enabledObjects.push(object);
        }
        if (!this.isAvailable(object) && !this.isSelected(object)) {
            this.availableObjects.push(object);
        }
    }
    disable(object) {
        this.throwErrorIfObjectDoesNotExistsInContainer(object);
        if (this.isEnabled(object)) {
            removeItem(this.enabledObjects, object);
        }
        if (this.isAvailable(object)) {
            removeItem(this.availableObjects, object);
        }
    }
    deselectAll() {
        for (let selectedObject of this.selectedObjects) {
            this.deselect(selectedObject);
        }
    }
    enableAll() {
        for (let object of this.objects) {
            this.enable(object);
        }
    }
    disableAll() {
        for (let enabledObject of this.enabledObjects) {
            this.disable(enabledObject);
        }
    }
}
