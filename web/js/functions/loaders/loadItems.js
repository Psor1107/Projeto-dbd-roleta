import IndependentRouletteContainer from "../../classes/IndependentRouletteContainer.js";
import OptionSelectButton from "../../classes/OptionSelectButton.js";
import SelectButton from "../../classes/SelectButton.js";
import SuperRouletteButton from "../../classes/SuperRouletteButton.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
import deselectAll from "../deselectAll.js";
import selectAll from "../selectAll.js";
function createItemIconWithTooltip(object) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`;
    return createIconWithTooltip(tooltip_text, object.icon);
}
export default async function loadItems(dependentContainer, dependentRouletteBtns, dependentSelectionsContainers) {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/items/items.json")
        .then((response) => response.json())
        .then((items) => {
        const itemBtnClass = "btn-items";
        const itemModal = document.getElementById("modal-items-body");
        const itemsSelectButtons = [];
        const itemsContainer = new IndependentRouletteContainer(items);
        const itemsPlaceholderSrc = "imgs/item-background.png";
        const itemsAddonsOptionsBody = document.getElementById('modal-survivors-addons-1-body');
        const itemsAddonsSelectBody = document.getElementById('modal-survivors-addons-2-body');
        const mainItemsNames = ['Flashlight', 'Skeleton Key', 'Map', 'First Aid Kit', 'Toolbox'];
        for (let item of items) {
            let icon = createItemIconWithTooltip(item);
            let itemSelectionBtn = new SelectButton(item, itemsContainer, icon, itemBtnClass, itemModal);
            itemsSelectButtons.push(itemSelectionBtn);
            if (mainItemsNames.includes(item.name)) {
                icon = createItemIconWithTooltip(item);
                const itemsAddonsOptionBtn = new OptionSelectButton(dependentContainer, item.type, itemsAddonsOptionsBody, itemsAddonsSelectBody, dependentSelectionsContainers[item.type], 'modal-survivors-addons-2', icon);
            }
        }
        const rouletteContainer = document.getElementById("items-roulette");
        const itemRouletteButton = new SuperRouletteButton(itemsContainer, rouletteContainer, createItemIconWithTooltip, itemBtnClass, itemsPlaceholderSrc, (item) => {
            if (item.type !== 'Firecracker') {
                return item.type;
            }
            else {
                return null;
            }
        }, [dependentContainer], dependentRouletteBtns);
        const btnSelectAllItems = document.getElementById('btn-select-all-items');
        btnSelectAllItems.addEventListener("click", () => {
            selectAll(itemsSelectButtons);
        });
        const btnDeselectAllItems = document.getElementById('btn-diselect-all-items');
        btnDeselectAllItems.addEventListener('click', () => {
            deselectAll(itemsSelectButtons);
        });
        return [itemRouletteButton];
    });
}
