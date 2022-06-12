import loadKillersCharacters from "./functions/loaders/loadKillers.js";
document.addEventListener('DOMContentLoaded', () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips');
    loadKillersCharacters().then(() => {
        btnLoadTooltips.click();
    });
});
