import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js";
import RouletteButton from "../../classes/RouletteButton.js";
import SelectButton from "../../classes/SelectButton.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
import deselectAll from "../deselectAll.js";
import selectAll from "../selectAll.js";
function createPerkIcon(object) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`;
    return createIconWithTooltip(tooltip_text, object.icon);
}
function loadPerks(perks, perksModal, rouletteContainer, btnSelectAllPerks, btnDeselectAllPerks, btnRouletteAllPerks) {
    const perksClass = "btn-perk";
    const perksPlaceholderSrc = "imgs/perk-background.png";
    const perksSelectionButtons = [];
    const perksContainer = new IndependentRouletteContainer(perks);
    const perksRouletteButtons = [];
    for (let perk of perks) {
        let icon = createPerkIcon(perk);
        const perkSelectBtn = new SelectButton(perk, perksContainer, icon, perksClass, perksModal);
        perksSelectionButtons.push(perkSelectBtn);
    }
    for (let i = 0; i < 4; i++) {
        const rouletteButtonBox = document.createElement('div');
        rouletteButtonBox.className = 'col';
        const rouletteBtn = new RouletteButton(perksContainer, rouletteButtonBox, createPerkIcon, perksClass, perksPlaceholderSrc);
        rouletteContainer.appendChild(rouletteButtonBox);
        perksRouletteButtons.push(rouletteBtn);
    }
    btnSelectAllPerks.addEventListener("click", () => {
        selectAll(perksSelectionButtons);
    });
    btnDeselectAllPerks.addEventListener('click', () => {
        deselectAll(perksSelectionButtons);
    });
    btnRouletteAllPerks.addEventListener('click', () => {
        for (let rouletteBtn of perksRouletteButtons) {
            rouletteBtn.click();
        }
    });
}
export async function loadKillersPerks() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
        .then((response) => response.json())
        .then((killersPerks) => {
        loadPerks(killersPerks, document.getElementById("modal-killers-perks-body"), document.getElementById("killers-perks-roulette"), document.getElementById('btn-select-all-killers-perks'), document.getElementById('btn-diselect-all-killers-perks'), document.getElementById('btn-roullete-killers-perks'));
    });
}
export async function loadSurvivorsPerks() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
        .then((response) => response.json())
        .then((survivorsPerks) => {
        loadPerks(survivorsPerks, document.getElementById("modal-survivors-perks-body"), document.getElementById("survivors-perks-roulette"), document.getElementById('btn-select-all-survivors-perks'), document.getElementById('btn-diselect-all-survivors-perks'), document.getElementById('btn-roullete-survivors-perks'));
    });
}
