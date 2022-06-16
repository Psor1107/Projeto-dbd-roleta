import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js";
import RouletteButton from "../../classes/RouletteButton.js";
import SelectButton from "../../classes/SelectButton.js";
import PerkInfo from "../../interfaces/PerkInfo.js";
import SurvivorInfo from "../../interfaces/SurvivorInfo.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
import deselectAll from "../deselectAll.js";
import selectAll from "../selectAll.js";

function createPerkIcon(object: PerkInfo): HTMLImageElement {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon)
}

function createSurvivorIcon(object: SurvivorInfo): HTMLImageElement {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon) 
}

function loadIndependents<T>(perks: T[], btnClass: string, placeholderSrc: string, perksModal: HTMLElement, rouletteContainer: HTMLElement, btnSelectAllPerks: HTMLButtonElement, btnDeselectAllPerks: HTMLButtonElement, createIcon: (object: T) => HTMLImageElement, qntRouletteBtns: number): RouletteButton<T>[] {
    const selectionsBtns: SelectButton<T>[] = []
    const container = new IndependentRouletteContainer<T>(perks)
    const rouletteBtns: RouletteButton<T>[] = []

    for (let perk of perks) {
        let icon = createIcon(perk)
        const perkSelectBtn = new SelectButton<T>(
            perk,
            container,
            icon,
            btnClass,
            perksModal
        )
        selectionsBtns.push(perkSelectBtn)
    }

    for (let i = 0; i < qntRouletteBtns; i++) {
        const rouletteButtonBox = document.createElement('div')
        rouletteButtonBox.className = 'col'
        const rouletteBtn = new RouletteButton<T>(
            container,
            rouletteButtonBox,
            createIcon,
            btnClass,
            placeholderSrc
        )
        
        // killers_roulette_buttons.push(roulette_btn)
        rouletteContainer.appendChild(rouletteButtonBox)
        rouletteBtns.push(rouletteBtn)
    }

    btnSelectAllPerks.addEventListener("click", () => {
        selectAll(selectionsBtns)
    })

    btnDeselectAllPerks.addEventListener('click', () => {
        deselectAll(selectionsBtns)
    })

    return rouletteBtns
}

export async function loadKillersPerks(): Promise<RouletteButton<PerkInfo>[]> {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
    .then((response) => response.json())
    .then((killersPerks: PerkInfo[]) => {
        return loadIndependents(
            killersPerks,
            "btn-perk",
            "imgs/perk-background.png",
            document.getElementById("modal-killers-perks-body") as HTMLElement,
            document.getElementById("killers-perks-roulette") as HTMLElement,
            document.getElementById('btn-select-all-killers-perks') as HTMLButtonElement,
            document.getElementById('btn-diselect-all-killers-perks') as HTMLButtonElement,
            createPerkIcon,
            4
        )
    })
}

export async function loadSurvivorsPerks(): Promise<RouletteButton<PerkInfo>[]> {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
    .then((response) => response.json())
    .then((survivorsPerks: PerkInfo[]) => {
        return loadIndependents<PerkInfo>(
            survivorsPerks,
            "btn-perk",
            "imgs/perk-background.png",
            document.getElementById("modal-survivors-perks-body") as HTMLElement,
            document.getElementById("survivors-perks-roulette") as HTMLElement,
            document.getElementById('btn-select-all-survivors-perks') as HTMLButtonElement,
            document.getElementById('btn-diselect-all-survivors-perks') as HTMLButtonElement,
            createPerkIcon,
            4
        )
    })
}

export async function loadSurvivors(): Promise<RouletteButton<SurvivorInfo>[]> {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/survivors/survivors.json")
    .then((response) => response.json())
    .then((survivors: SurvivorInfo[]) => {
        return loadIndependents<SurvivorInfo>(
            survivors,
            "btn-character",
            "imgs/character-background.png",
            document.getElementById("modal-survivors-characters-body") as HTMLElement,
            document.getElementById("survivors-characters-roulette") as HTMLElement,
            document.getElementById('btn-select-all-survivors-characters') as HTMLButtonElement,
            document.getElementById('btn-diselect-all-survivors-characters') as HTMLButtonElement,
            createSurvivorIcon,
            1
        )
    })
}