export default class OptionSelectButton {
    constructor(dependentContainer, option, optionsParent, selectionsParent, selectionsBtnsContainer, modalId, icon) {
        this.dependentContainer = dependentContainer;
        this.option = option;
        this.optionsParent = optionsParent;
        this.selectionParent = selectionsParent;
        this.selectionBtnsContainer = selectionsBtnsContainer;
        this.createButton(icon, modalId);
    }
    createButton(icon, modalId) {
        let button_box = document.createElement('div');
        button_box.className = 'col';
        let button = document.createElement('button');
        button.className = 'bg-dark btn-selection-modal';
        button.dataset.bsTarget = `#${modalId}`;
        button.dataset.bsToggle = "modal";
        button.dataset.bsDismiss = "modal";
        button.addEventListener('click', this.showSelectButtons.bind(this));
        button.appendChild(icon);
        button_box.appendChild(button);
        this.optionsParent.appendChild(button_box);
        this.selectionParent.appendChild(this.selectionBtnsContainer);
    }
    showSelectButtons() {
        console.log(this);
        for (let addon_container of this.selectionParent.children) {
            addon_container.classList.add('d-none');
        }
        this.selectionBtnsContainer.classList.remove('d-none');
        this.dependentContainer.selectEnableOption(this.option);
    }
}
