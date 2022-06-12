import RouletteContainer from "../interfaces/RouletteContainer.js"

export default class SelectButton<T> {
    private object: T
    private container: RouletteContainer<T>
    private selected: boolean
    private button: HTMLButtonElement
    private btnClass: string

    public constructor(object: T, container: RouletteContainer<T>, icon: HTMLImageElement, btnClass: string, HTMLParent: HTMLElement) {
        this.object = object
        this.container = container
        this.selected = true
        this.btnClass = btnClass
        this.button = this.createHTMLButton(icon, HTMLParent)
    }

    private createHTMLButton(icon: HTMLImageElement, HTMLParent: HTMLElement): HTMLButtonElement {
        let button_box = document.createElement('div')
        button_box.className = 'col'

        let button = document.createElement('button')
        button.className = `bg-dark btn-selection-modal ${this.btnClass}-hover ${this.btnClass}-enabled`
        button.addEventListener('click', () => {
            if (this.selected) {
                this.deselect()
            } else {
                this.select()
            }
        })
        
        button_box.appendChild(button)
        button.appendChild(icon)
        HTMLParent.appendChild(button_box)
        return button
    }

    public select(): void {
        if (!this.selected) {
            this.selected = true
            this.container.enable(this.object)
            this.button.classList.remove(`${this.btnClass}-disabled`)
            this.button.classList.add(`${this.btnClass}-enabled`)
        }
    }

    public deselect(): void {
        if (this.selected) {
            this.selected = false
            this.container.disable(this.object)
            this.button.classList.remove(`${this.btnClass}-enabled`)
            this.button.classList.add(`${this.btnClass}-disabled`)
        }
    }
}