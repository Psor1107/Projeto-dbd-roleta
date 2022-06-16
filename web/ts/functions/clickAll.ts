import RouletteButton from "../classes/RouletteButton.js";

export default function clickAll(rouletteBtns: RouletteButton<any>[]) {
    for (let rouletteBtn of rouletteBtns) {
        rouletteBtn.click()
    }
}