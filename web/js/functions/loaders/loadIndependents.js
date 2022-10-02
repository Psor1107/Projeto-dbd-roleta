import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js";
import RouletteButton from "../../classes/RouletteButton.js";
import SelectButton from "../../classes/SelectButton.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
import deselectAll from "../deselectAll.js";
import selectAll from "../selectAll.js";
function createPerkIcon(object) {
    console.log(object);
    let tooltip_text = `
    <h2 class='h5'>${object.name}</h2>
    <p>Pagina: ${object.page}</p>
    <p>Linha: ${object.row}</p>
    <p>Coluna: ${object.column}</p>
    `;
    return createIconWithTooltip(tooltip_text, object.icon);
}
function createSurvivorIcon(object) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`;
    return createIconWithTooltip(tooltip_text, object.icon);
}
function loadIndependents(perks, btnClass, placeholderSrc, perksModal, rouletteContainer, btnSelectAllPerks, btnDeselectAllPerks, createIcon, qntRouletteBtns) {
    const selectionsBtns = [];
    const container = new IndependentRouletteContainer(perks);
    const rouletteBtns = [];
    for (let perk of perks) {
        let icon = createIcon(perk);
        const perkSelectBtn = new SelectButton(perk, container, icon, btnClass, perksModal);
        selectionsBtns.push(perkSelectBtn);
    }
    for (let i = 0; i < qntRouletteBtns; i++) {
        const rouletteButtonBox = document.createElement('div');
        rouletteButtonBox.className = 'col';
        const rouletteBtn = new RouletteButton(container, rouletteButtonBox, createIcon, btnClass, placeholderSrc);
        rouletteContainer.appendChild(rouletteButtonBox);
        rouletteBtns.push(rouletteBtn);
    }
    btnSelectAllPerks.addEventListener("click", () => {
        selectAll(selectionsBtns);
    });
    btnDeselectAllPerks.addEventListener('click', () => {
        deselectAll(selectionsBtns);
    });
    return rouletteBtns;
}
export async function loadKillersPerks() {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
        .then((response) => response.json())
        .then((killersPerks) => {
        return loadIndependents(killersPerks, "btn-perk", "imgs/perk-background.png", document.getElementById("modal-killers-perks-body"), document.getElementById("killers-perks-roulette"), document.getElementById('btn-select-all-killers-perks'), document.getElementById('btn-diselect-all-killers-perks'), createPerkIcon, 4);
    });
}
export async function loadSurvivorsPerks() {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
        .then((response) => response.json())
        .then((survivorsPerks) => {
        return loadIndependents(survivorsPerks, "btn-perk", "imgs/perk-background.png", document.getElementById("modal-survivors-perks-body"), document.getElementById("survivors-perks-roulette"), document.getElementById('btn-select-all-survivors-perks'), document.getElementById('btn-diselect-all-survivors-perks'), createPerkIcon, 4);
    });
}
export async function loadSurvivors() {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/survivors/survivors.json")
        .then((response) => response.json())
        .then((survivors) => {
        return loadIndependents(survivors, "btn-character", "imgs/character-background.png", document.getElementById("modal-survivors-characters-body"), document.getElementById("survivors-characters-roulette"), document.getElementById('btn-select-all-survivors-characters'), document.getElementById('btn-diselect-all-survivors-characters'), createSurvivorIcon, 1);
    });
}
