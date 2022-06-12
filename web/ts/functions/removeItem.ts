
// Code from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array

export default function removeItem(list: any[], value: any): void {
  var index = list.indexOf(value);
  if (index > -1) {
    list.splice(index, 1);
  }
}