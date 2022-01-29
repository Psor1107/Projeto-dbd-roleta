
// Code from https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array 
function removeItem(list, value) {
    var index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    }
    return list;
}

// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-35.php
function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}