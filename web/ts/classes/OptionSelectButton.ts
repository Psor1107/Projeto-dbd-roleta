import DependentRouletteContainer from "./DependentRouletteContainer.js";

export default class OptionSelectButton<T> {
    private dependentContainer: DependentRouletteContainer<T>
    private option: string
    private optionsParent: HTMLDivElement
    private selectionParent: HTMLDivElement
    private selectionBtnsContainer: HTMLDivElement

    public constructor(dependentContainer: DependentRouletteContainer<T>, option: string, optionsParent: HTMLDivElement, selectionsParent: HTMLDivElement, selectionsBtnsContainer: HTMLDivElement, modalId: string, icon: HTMLImageElement) {
        this.dependentContainer = dependentContainer
        this.option = option
        this.optionsParent = optionsParent
        this.selectionParent = selectionsParent
        this.selectionBtnsContainer = selectionsBtnsContainer
        this.createButton(icon, modalId)
    }

    private createButton(icon: HTMLImageElement, modalId: string) {
        let button_box = document.createElement('div')
        button_box.className = 'col'

        let button = document.createElement('button')
        button.className = 'bg-dark btn-selection-modal'
        button.dataset.bsTarget = `#${modalId}`
        button.dataset.bsToggle = "modal"
        button.dataset.bsDismiss = "modal"
        button.addEventListener('click', this.showSelectButtons.bind(this))

        button.appendChild(icon)
        button_box.appendChild(button)
        this.optionsParent.appendChild(button_box)
        this.selectionParent.appendChild(this.selectionBtnsContainer)
    }

    private showSelectButtons() {
        console.log(this)
        for (let addon_container of this.selectionParent.children) {
            addon_container.classList.add('d-none')
        }
        this.selectionBtnsContainer.classList.remove('d-none')
        this.dependentContainer.selectEnableOption(this.option)
    }
}