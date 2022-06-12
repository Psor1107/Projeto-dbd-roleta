
// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-35.php
export default function getRandomItem(list: any[]): any {
    return list[Math.floor(Math.random()*list.length)];
}