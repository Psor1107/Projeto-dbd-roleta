export default function deselectAll(selectionButtons) {
    for (let btn of selectionButtons) {
        btn.deselect();
    }
}
