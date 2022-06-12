import loadKillersCharacters from "./functions/loaders/loadKillers.js";
import { loadKillersPerks, loadSurvivorsPerks } from "./functions/loaders/loadPerks.js";
document.addEventListener('DOMContentLoaded', () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips');
    loadKillersCharacters().then(() => {
        btnLoadTooltips.click();
    });
    loadKillersPerks().then(() => {
        btnLoadTooltips.click();
    });
    loadSurvivorsPerks().then(() => {
        btnLoadTooltips.click();
    });
});
