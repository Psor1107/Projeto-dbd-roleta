export default function removeItem(list, value) {
    var index = list.indexOf(value);
    if (index > -1) {
        list.splice(index, 1);
    }
}
