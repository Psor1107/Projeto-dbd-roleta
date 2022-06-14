import RouletteContainer from "../interfaces/RouletteContainer.js";
import IndependentRouletteContainer from "./IndependentRouletteContainer.js";

// Array de IndependentRouletteContainers ???
export default class DependentRouletteContainer<T>
implements RouletteContainer<T> {

    private objects: { [key: string]: T[]} = {}
    private containers: { [key: string]: IndependentRouletteContainer<T>} = {}
    private selectedRouletteOption: string | null // Opção selecionada para a roleta (deve selecionar um aleatorio dessa opção)
    private selectedEnableOption: string | null // Opção selecionada para habilitação/desabilitação (todo objeto que for desabilitado ou habilitado deve ser nessa opção).

    public constructor(objects: { [key: string]: T[]}) {
        this.objects = objects
        this.selectedEnableOption = null
        this.selectedRouletteOption = null
        for (var option in objects) {
            this.containers[option] = new IndependentRouletteContainer<T>(this.objects[option])
        }
    }

    private throwErrorIfInvalidOption(option: string): void {
        if (!Object.keys(this.objects).includes(option)) {
            throw new Error(`Opção ${option} não existe em ${this}`)
        }
    }

    public selectRouletteOption(option: string | null): void {
        if (option)
            this.throwErrorIfInvalidOption(option)
        this.selectedRouletteOption = option
    }

    public selectEnableOption(option: string | null): void {
        if (option)
            this.throwErrorIfInvalidOption(option)
        this.selectedEnableOption = option
    }

    public isAvailable(object: T, option: string): boolean {
        return this.containers[option].isAvailable(object)
    }

    public isEnabled(object: T, option: string): boolean {
        return this.containers[option].isEnabled(object)
    }

    public isSelected(object: T, option: string): boolean {
        return this.containers[option].isSelected(object)
    }
    

    public selectRandom(): T | null {
        if (!this.selectedRouletteOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`)
        }
        return this.containers[this.selectedRouletteOption].selectRandom()
    }

    public deselect(object: T): void {
        if (!this.selectedRouletteOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`)
        }
        this.containers[this.selectedRouletteOption].deselect(object)
    }

    public enable(object: T): void {
        if (!this.selectedEnableOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`)
        }
        this.containers[this.selectedEnableOption].enable(object)
    }

    public disable(object: T): void {
        if (!this.selectedEnableOption) {
            throw new Error(`Nenhuma opção foi selecionado em ${this}`)
        }
        this.containers[this.selectedEnableOption].disable(object)
    }

    public deselectAll(): void {
        for (let containerName in this.containers) {
            this.containers[containerName].deselectAll()
        }
    }

    public enableAll(): void {
        for (let containerName in this.containers) {
            this.containers[containerName].enableAll()
        }
    }

    public disableAll(): void {
        for (let containerName in this.containers) {
            this.containers[containerName].disableAll()
        }
    }
}