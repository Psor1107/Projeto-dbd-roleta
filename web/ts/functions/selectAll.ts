import SelectButton from "../classes/SelectButton.js";

export default function selectAll(selectionButtons: SelectButton<any>[]): void {
    for (let btn of selectionButtons) {
        btn.select()
    }
}