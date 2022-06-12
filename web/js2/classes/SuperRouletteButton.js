import RouletteButton from "./RouletteButton.js";
export default class SuperRouletteButton extends RouletteButton {
    constructor(container, HTMLParent, createIconWithTooltip, btnClass, placeHolderIconSrc, getOptionKey, dependentContainers, dependentButtons) {
        super(container, HTMLParent, createIconWithTooltip, btnClass, placeHolderIconSrc);
        this.getOptionKey = getOptionKey;
        this.dependentContainers = dependentContainers;
        this.dependentButtons = dependentButtons;
    }
    update() {
        super.update();
        for (let dependentContainer of this.dependentContainers) {
            if (this.selectedObject) {
                dependentContainer.selectRouletteOption(this.getOptionKey(this.selectedObject));
            }
        }
        for (let dependentButton of this.dependentButtons) {
            dependentButton.clearButton();
        }
    }
    clearButton() {
        super.clearButton();
        for (let dependentContainer of this.dependentContainers) {
            dependentContainer.selectRouletteOption(null);
        }
        for (let dependentButton of this.dependentButtons) {
            dependentButton.clearButton();
        }
    }
}
