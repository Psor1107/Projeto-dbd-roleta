import loadKillersCharacters from "./functions/loaders/loadKillers"

document.addEventListener('DOMContentLoaded', () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips') as HTMLButtonElement
    loadKillersCharacters().then(() => {
        btnLoadTooltips.click()
    })
})