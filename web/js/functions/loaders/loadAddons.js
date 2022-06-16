import DependentRouletteContainer from "../../classes/DependentRouletteContainer.js";
import RouletteButton from "../../classes/RouletteButton.js";
import SelectButton from "../../classes/SelectButton.js";
import createIconWithTooltip from "../createIconWithTooltip.js";
function createAddonIcon(object) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`;
    return createIconWithTooltip(tooltip_text, object.icon);
}
function loadAddOns(addons, addonsBtnClass, rouletteParent, imgPlaceholderSrc) {
    function createContainer(option) {
        let addons_container = document.createElement('div');
        addons_container.className = 'row row-cols-3 row-cols-md-4 row-cols-lg-6 gy-4';
        return addons_container;
    }
    const dependentContainer = new DependentRouletteContainer(addons);
    const containers = {};
    for (let option in addons) {
        const container = createContainer(option);
        for (let addon of addons[option]) {
            const icon = createAddonIcon(addon);
            const btnSelect = new SelectButton(addon, dependentContainer, icon, addonsBtnClass, container);
        }
        containers[option] = container;
    }
    const addonsRouletteBtns = [];
    for (let i = 0; i < 2; i++) {
        addonsRouletteBtns.push(new RouletteButton(dependentContainer, rouletteParent, createAddonIcon, addonsBtnClass, imgPlaceholderSrc));
    }
    return {
        dependentContainer: dependentContainer,
        rouletteBtns: addonsRouletteBtns,
        containers: containers
    };
}
export async function loadKillersAddons() {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers_add-ons/killers_add-ons.json")
        .then((response) => response.json())
        .then((addons) => {
        return loadAddOns(addons, 'btn-killer-addon', document.getElementById("killers-addons-roulette"), "imgs/addon-background.png");
    });
}
export async function loadItemsAddons() {
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/items_add-ons/items_add-ons.json")
        .then((response) => response.json())
        .then((addons) => {
        return loadAddOns(addons, 'btn-items-addons', document.getElementById("survivors-addons-roulette"), "imgs/addon-background.png");
    });
}
