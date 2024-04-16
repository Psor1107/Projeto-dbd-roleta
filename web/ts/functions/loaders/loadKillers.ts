import DependentRouletteContainer from "../../classes/DependentRouletteContainer.js"
import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js"
import OptionSelectButton from "../../classes/OptionSelectButton.js"
import RouletteButton from "../../classes/RouletteButton.js"
import SelectButton from "../../classes/SelectButton.js"
import SuperRouletteButton from "../../classes/SuperRouletteButton.js"
import AddOnInfo from "../../interfaces/AddOnInfo.js"
import KillerInfo from "../../interfaces/KillerInfo.js"
import createIconWithTooltip from "../createIconWithTooltip.js"
import deselectAll from "../deselectAll.js"
import selectAll from "../selectAll.js"


function createKillerIconWithTooltip(object: KillerInfo) {
    let tooltip_text = `
    <h2 class='h5'>${object.alias}</h2>
    <p>Linha: ${object.row}</p>
    <p>Coluna: ${object.column}</p>
    `
    return createIconWithTooltip(tooltip_text, object.icon)
} 

export default async function loadKillers(dependentContainer: DependentRouletteContainer<AddOnInfo>, dependentRouletteBtns: RouletteButton<AddOnInfo>[], dependentSelectionsContainers: { [key: string]: HTMLDivElement}) {
    return await fetch("https://raw.githubusercontent.com/Psor1107/Projeto-dbd-roleta/main//data/killers/killers.json")
    .then((response) => response.json())
    .then((killers: KillerInfo[]) => {
        const killerBtnClass = 'btn-character'
        const killerModal = document.getElementById("modal-killers-characters-body") as HTMLElement
        const killerSelectionButtons: SelectButton<KillerInfo>[] = []
        const killersContainer = new IndependentRouletteContainer<KillerInfo>(killers)
        const killerPlaceholderSrc = "imgs/character-background.png"
        const killersAddonsOptionsModal = document.getElementById('modal-killers-addons-1-body') as HTMLDivElement
        const killersAddonsSelectionModal = document.getElementById('modal-killers-addons-2-body') as HTMLDivElement


        for (let killer of killers) {
            let icon = createKillerIconWithTooltip(killer)
            let killerSelectionBtn = new SelectButton<KillerInfo>(
                killer,
                killersContainer,
                icon,
                killerBtnClass,
                killerModal
            )
            killerSelectionButtons.push(killerSelectionBtn)
            
            icon = createKillerIconWithTooltip(killer)
            const killerAddonsOptionBtn = new OptionSelectButton<AddOnInfo> (
                dependentContainer,
                killer.alias,
                killersAddonsOptionsModal,
                killersAddonsSelectionModal,
                dependentSelectionsContainers[killer.alias],
                'modal-killers-addons-2',
                icon
            )
        }

        const rouletteContainer = document.getElementById("killers-characters-roulette") as HTMLElement
        const killerRouletteButton = new SuperRouletteButton<KillerInfo>(
            killersContainer,
            rouletteContainer,
            createKillerIconWithTooltip,
            killerBtnClass,
            killerPlaceholderSrc,
            killer => killer.alias,
            [dependentContainer],
            dependentRouletteBtns
        )
        
        const btnSelectAllKillers = document.getElementById('btn-select-all-killers-characters') as HTMLButtonElement
        btnSelectAllKillers.addEventListener("click", () => {
            selectAll(killerSelectionButtons)
        })

        const btnDeselectAllKillers = document.getElementById('btn-diselect-all-killers-characters') as HTMLButtonElement
        btnDeselectAllKillers.addEventListener('click', () => {
            deselectAll(killerSelectionButtons)
        })

        return [killerRouletteButton]
    })
}
