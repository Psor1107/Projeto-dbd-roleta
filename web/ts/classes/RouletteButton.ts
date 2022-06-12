import RouletteContainer from "../interfaces/RouletteContainer.js";

export default class RouletteButton<T> {
    private container: RouletteContainer<T>
    private button: HTMLButtonElement
    protected selectedObject: T | null
    private createIconWithTooltip: (object: T) => HTMLImageElement
    private btnClass: string
    private placeHolderIconSrc: string

    public constructor(container: RouletteContainer<T>, HTMLParent: HTMLElement, createIconWithTooltip: (object: T) => HTMLImageElement, btnClass: string, placeHolderIconSrc: string) {
        this.container = container
        this.createIconWithTooltip = createIconWithTooltip
        this.btnClass = btnClass
        this.placeHolderIconSrc = placeHolderIconSrc
        this.button = this.createButton()
        HTMLParent.appendChild(this.button)
    }

    public click() {
        this.button.click()
    }

    public clearButton() {
        this.button.children[0].remove()

        let img = document.createElement('img')
        img.className = 'img-fluid'
        img.src = this.placeHolderIconSrc
        this.button.appendChild(img)

        if (this.selectedObject) {
            this.container.deselect(this.selectedObject)
        }
        this.selectedObject = null
    }

    private createButton() {
        let button = document.createElement('button')
        button.className = `btn-selection-modal ${this.btnClass}-roulette`
        button.addEventListener('click', () => {
            this.update()
        })
        let img = document.createElement('img')
        img.className = 'img-fluid'
        img.src = this.placeHolderIconSrc

        button.appendChild(img)
        return button
    }

    protected update() {
        let randomObject = this.container.selectRandom()
        if (randomObject) {
            const icon = this.createIconWithTooltip(randomObject)
            icon.classList.add('roulette-tooltip')
            this.button.appendChild(icon)
            this.button.children[0].remove()
        
            if (this.selectedObject) {
                this.container.deselect(this.selectedObject)
            }
            this.selectedObject = randomObject
        }
    }
}