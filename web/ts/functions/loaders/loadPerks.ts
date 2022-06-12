import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js";
import RouletteButton from "../../classes/RouletteButton.js";
import SelectButton from "../../classes/SelectButton.js";
import PerkInfo from "../../interfaces/PerkInfo.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
import deselectAll from "../deselectAll.js";
import selectAll from "../selectAll.js";

function createPerkIcon(object: PerkInfo): HTMLImageElement {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon)
}

function loadPerks(perks: PerkInfo[], perksModal: HTMLElement, rouletteContainer: HTMLElement, btnSelectAllPerks: HTMLButtonElement, btnDeselectAllPerks: HTMLButtonElement, btnRouletteAllPerks: HTMLButtonElement) {
    const perksClass = "btn-perk"
    const perksPlaceholderSrc = "imgs/perk-background.png"
    const perksSelectionButtons: SelectButton<PerkInfo>[] = []
    const perksContainer = new IndependentRouletteContainer<PerkInfo>(perks)
    const perksRouletteButtons: RouletteButton<PerkInfo>[] = []

    for (let perk of perks) {
        let icon = createPerkIcon(perk)
        const perkSelectBtn = new SelectButton<PerkInfo>(
            perk,
            perksContainer,
            icon,
            perksClass,
            perksModal
        )
        perksSelectionButtons.push(perkSelectBtn)
    }

    for (let i = 0; i < 4; i++) {
        const rouletteButtonBox = document.createElement('div')
        rouletteButtonBox.className = 'col'
        const rouletteBtn = new RouletteButton<PerkInfo>(
            perksContainer,
            rouletteButtonBox,
            createPerkIcon,
            perksClass,
            perksPlaceholderSrc
        )
        
        // killers_roulette_buttons.push(roulette_btn)
        rouletteContainer.appendChild(rouletteButtonBox)
        perksRouletteButtons.push(rouletteBtn)
    }

    btnSelectAllPerks.addEventListener("click", () => {
        selectAll(perksSelectionButtons)
    })

    btnDeselectAllPerks.addEventListener('click', () => {
        deselectAll(perksSelectionButtons)
    })

    btnRouletteAllPerks.addEventListener('click', () => {
        for (let rouletteBtn of perksRouletteButtons) {
            rouletteBtn.click()
        }
    })
}

export async function loadKillersPerks() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
    .then((response) => response.json())
    .then((killersPerks: PerkInfo[]) => {
        loadPerks(
            killersPerks,
            document.getElementById("modal-killers-perks-body") as HTMLElement,
            document.getElementById("killers-perks-roulette") as HTMLElement,
            document.getElementById('btn-select-all-killers-perks') as HTMLButtonElement,
            document.getElementById('btn-diselect-all-killers-perks') as HTMLButtonElement,
            document.getElementById('btn-roullete-killers-perks') as HTMLButtonElement
        )
    })
}

export async function loadSurvivorsPerks() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
    .then((response) => response.json())
    .then((survivorsPerks: PerkInfo[]) => {
        loadPerks(
            survivorsPerks,
            document.getElementById("modal-survivors-perks-body") as HTMLElement,
            document.getElementById("survivors-perks-roulette") as HTMLElement,
            document.getElementById('btn-select-all-survivors-perks') as HTMLButtonElement,
            document.getElementById('btn-diselect-all-survivors-perks') as HTMLButtonElement,
            document.getElementById('btn-roullete-survivors-perks') as HTMLButtonElement
        )
    })
}