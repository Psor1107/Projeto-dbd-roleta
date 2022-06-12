import IndependentRouletteContainer from "./IndependentRouletteContainer.js";
export default class DependentRouletteContainer {
    constructor(objects) {
        this.objects = objects;
        this.selectedEnableOption = null;
        this.selectedRouletteOption = null;
        for (var option in objects) {
            this.containers[option] = new IndependentRouletteContainer(this.objects[option]);
        }
    }
    throwErrorIfInvalidOption(option) {
        if (!Object.keys(this.objects).includes(option)) {
            throw new Error(`Opção ${option} não existe em ${this}`);
        }
    }
    selectRouletteOption(option) {
        if (option)
            this.throwErrorIfInvalidOption(option);
        this.selectedRouletteOption = option;
    }
    selectEnableOption(option) {
        if (option)
            this.throwErrorIfInvalidOption(option);
        this.selectedEnableOption = option;
    }
    isAvailable(object, option) {
        return this.containers[option].isAvailable(object);
    }
    isEnabled(object, option) {
        return this.containers[option].isEnabled(object);
    }
    isSelected(object, option) {
        return this.containers[option].isSelected(object);
    }
    selectRandom() {
        if (!this.selectedRouletteOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`);
        }
        return this.containers[this.selectedRouletteOption].selectRandom();
    }
    deselect(object) {
        if (!this.selectedRouletteOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`);
        }
        this.containers[this.selectedRouletteOption].deselect(object);
    }
    enable(object) {
        if (!this.selectedEnableOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`);
        }
        this.containers[this.selectedEnableOption].enable(object);
    }
    disable(object) {
        if (!this.selectedEnableOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`);
        }
        this.containers[this.selectedEnableOption].disable(object);
    }
    deselectAll() {
        for (let containerName in this.containers) {
            this.containers[containerName].deselectAll();
        }
    }
    enableAll() {
        for (let containerName in this.containers) {
            this.containers[containerName].enableAll();
        }
    }
    disableAll() {
        for (let containerName in this.containers) {
            this.containers[containerName].disableAll();
        }
    }
}
