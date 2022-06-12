export default class SelectButton {
    constructor(object, container, icon, btnClass, HTMLParent) {
        this.object = object;
        this.container = container;
        this.selected = true;
        this.btnClass = btnClass;
        this.button = this.createHTMLButton(icon, HTMLParent);
    }
    createHTMLButton(icon, HTMLParent) {
        let button_box = document.createElement('div');
        button_box.className = 'col';
        let button = document.createElement('button');
        button.className = `bg-dark btn-selection-modal ${this.btnClass}-hover ${this.btnClass}-enabled`;
        button.addEventListener('click', () => {
            if (this.selected) {
                this.deselect();
            }
            else {
                this.select();
            }
        });
        button_box.appendChild(button);
        button.appendChild(icon);
        HTMLParent.appendChild(button_box);
        return button;
    }
    select() {
        if (!this.selected) {
            this.selected = true;
            this.container.enable(this.object);
            this.button.classList.remove(`${this.btnClass}-disabled`);
            this.button.classList.add(`${this.btnClass}-enabled`);
        }
    }
    deselect() {
        if (this.selected) {
            this.selected = false;
            this.container.disable(this.object);
            this.button.classList.remove(`${this.btnClass}-enabled`);
            this.button.classList.add(`${this.btnClass}-disabled`);
        }
    }
}
