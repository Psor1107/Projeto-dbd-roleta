import SelectButton from "../classes/SelectButton.js";

export default function deselectAll(selectionButtons: SelectButton<any>[]): void {
    for (let btn of selectionButtons) {
        btn.deselect()
    }
}