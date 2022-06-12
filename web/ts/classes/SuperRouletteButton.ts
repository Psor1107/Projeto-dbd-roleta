import RouletteContainer from "../interfaces/RouletteContainer.js"
import DependentRouletteContainer from "./DependentRouletteContainer.js"
import RouletteButton from "./RouletteButton.js"

export default class SuperRouletteButton<T> extends RouletteButton<T> {
    private getOptionKey: (object: T) => string
    private dependentContainers: DependentRouletteContainer<any>[]
    private dependentButtons: RouletteButton<any>[]

    public constructor(container: RouletteContainer<T>, HTMLParent: HTMLElement, createIconWithTooltip: (object: T) => HTMLImageElement, btnClass: string, placeHolderIconSrc: string, getOptionKey: (object: T) => string, dependentContainers: DependentRouletteContainer<any>[], dependentButtons: RouletteButton<any>[]) {
        super(container, HTMLParent, createIconWithTooltip, btnClass, placeHolderIconSrc)
        this.getOptionKey = getOptionKey
        this.dependentContainers = dependentContainers
        this.dependentButtons = dependentButtons
    }

    protected update() {
        super.update()
        for (let dependentContainer of this.dependentContainers) {
            if (this.selectedObject) {
                dependentContainer.selectRouletteOption(this.getOptionKey(this.selectedObject))
            }
        }

        for (let dependentButton of this.dependentButtons) {
            dependentButton.clearButton()
        }
    }

    public clearButton(): void {
        super.clearButton()
        for (let dependentContainer of this.dependentContainers) {
            dependentContainer.selectRouletteOption(null)
        }
        for (let dependentButton of this.dependentButtons) {
            dependentButton.clearButton()
        }
    }
}