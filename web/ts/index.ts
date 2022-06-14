import { loadKillersAddons } from "./functions/loaders/loadAddons.js"
import loadKillersCharacters from "./functions/loaders/loadKillers.js"
import { loadKillersPerks, loadSurvivorsPerks } from "./functions/loaders/loadPerks.js"

document.addEventListener('DOMContentLoaded', () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips') as HTMLButtonElement

    loadKillersAddons()
    .then((object) => {
        loadKillersCharacters(
            object.dependentContainer,
            object.rouletteBtns,
            object.containers
        )
        .then(() => {
            btnLoadTooltips.click()
        })
    })

    loadKillersPerks()
    .then(() => {
        btnLoadTooltips.click()
    })

    loadSurvivorsPerks()
    .then(() => {
        btnLoadTooltips.click()
    })
})