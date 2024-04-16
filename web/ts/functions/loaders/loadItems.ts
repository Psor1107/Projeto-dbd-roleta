import DependentRouletteContainer from "../../classes/DependentRouletteContainer.js"
import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js"
import OptionSelectButton from "../../classes/OptionSelectButton.js"
import RouletteButton from "../../classes/RouletteButton.js"
import SelectButton from "../../classes/SelectButton.js"
import SuperRouletteButton from "../../classes/SuperRouletteButton.js"
import AddOnInfo from "../../interfaces/AddOnInfo.js"
import ItemInfo from "../../interfaces/ItemInfo.js"
import createIconWithTooltip from "../createIconWithTooltip.js"
import deselectAll from "../deselectAll.js"
import selectAll from "../selectAll.js"


function createItemIconWithTooltip(object: ItemInfo) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon)
} 

export default async function loadItems(dependentContainer: DependentRouletteContainer<AddOnInfo>, dependentRouletteBtns: RouletteButton<AddOnInfo>[], dependentSelectionsContainers: { [key: string]: HTMLDivElement}) {
    return await fetch("https://raw.githubusercontent.com/Psor1107/Projeto-dbd-roleta/main//data/items/items.json")
    .then((response) => response.json())
    .then((items: ItemInfo[]) => {
        const itemBtnClass = "btn-items"
        const itemModal = document.getElementById("modal-items-body") as HTMLElement
        const itemsSelectButtons: SelectButton<ItemInfo>[] = []
        const itemsContainer = new IndependentRouletteContainer<ItemInfo>(items)
        const itemsPlaceholderSrc = "imgs/item-background.png"
        const itemsAddonsOptionsBody = document.getElementById('modal-survivors-addons-1-body') as HTMLDivElement
        const itemsAddonsSelectBody = document.getElementById('modal-survivors-addons-2-body') as HTMLDivElement

        const mainItemsNames = ['Flashlight', 'Skeleton Key', 'Map', 'First Aid Kit', 'Toolbox']
        for (let item of items) {
            let icon = createItemIconWithTooltip(item)
            let itemSelectionBtn = new SelectButton<ItemInfo>(
                item,
                itemsContainer,
                icon,
                itemBtnClass,
                itemModal
            )
            itemsSelectButtons.push(itemSelectionBtn)
            
            if (mainItemsNames.includes(item.name)) {
                icon = createItemIconWithTooltip(item)
                const itemsAddonsOptionBtn = new OptionSelectButton<AddOnInfo> (
                    dependentContainer,
                    item.type,
                    itemsAddonsOptionsBody,
                    itemsAddonsSelectBody,
                    dependentSelectionsContainers[item.type],
                    'modal-survivors-addons-2',
                    icon
                )
            }
        }

        const rouletteContainer = document.getElementById("items-roulette") as HTMLElement
        const itemRouletteButton = new SuperRouletteButton<ItemInfo>(
            itemsContainer,
            rouletteContainer,
            createItemIconWithTooltip,
            itemBtnClass,
            itemsPlaceholderSrc,
            (item) => {
                if (item.type !== 'Firecracker') {
                    return item.type
                } else {
                    return null
                }
            },
            [dependentContainer],
            dependentRouletteBtns
        )
        
        const btnSelectAllItems = document.getElementById('btn-select-all-items') as HTMLButtonElement
        btnSelectAllItems.addEventListener("click", () => {
            selectAll(itemsSelectButtons)
        })

        const btnDeselectAllItems = document.getElementById('btn-diselect-all-items') as HTMLButtonElement
        btnDeselectAllItems.addEventListener('click', () => {
            deselectAll(itemsSelectButtons)
        })

        return [itemRouletteButton]
    })
}
