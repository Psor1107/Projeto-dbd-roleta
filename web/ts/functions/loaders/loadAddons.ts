import DependentRouletteContainer from "../../classes/DependentRouletteContainer.js"
import RouletteButton from "../../classes/RouletteButton.js"
import SelectButton from "../../classes/SelectButton.js"
import AddOnInfo from "../../interfaces/AddOnInfo.js"
import createIconWithTooltip from "../createIconWithTooltip.js"

function createAddonIcon(object: AddOnInfo) {
    let tooltip_text = `<h2 class='h5'>${object.name}</h2>`
    return createIconWithTooltip(tooltip_text, object.icon)
}

function loadAddOns (addons: { [key :string]: AddOnInfo[] }, addonsBtnClass: string, rouletteParent: HTMLDivElement, imgPlaceholderSrc: string) :
{dependentContainer: DependentRouletteContainer<AddOnInfo>, rouletteBtns: RouletteButton<AddOnInfo>[], containers: { [key: string]: HTMLDivElement}} 
{
    function createContainer(option: string) {
        let addons_container = document.createElement('div')
        addons_container.className = 'row row-cols-3 row-cols-md-4 row-cols-lg-6 gy-4'
        return addons_container
    }

    const dependentContainer = new DependentRouletteContainer<AddOnInfo>(addons)
    const containers: { [key: string]: HTMLDivElement} = {}
    for (let option in addons) {
        const container = createContainer(option)
        for (let addon of addons[option]) {
            const icon = createAddonIcon(addon)
            const btnSelect = new SelectButton<AddOnInfo>(
                addon,
                dependentContainer,
                icon,
                addonsBtnClass,
                container
            )
        }
        containers[option] = container
    }

    const addonsRouletteBtns: RouletteButton<AddOnInfo>[] = []
    for (let i = 0; i < 2; i++) {
        addonsRouletteBtns.push( new RouletteButton<AddOnInfo>(
            dependentContainer,
            rouletteParent,
            createAddonIcon,
            addonsBtnClass,
            imgPlaceholderSrc
        ))
    }

    return {
        dependentContainer: dependentContainer,
        rouletteBtns: addonsRouletteBtns,
        containers: containers
    }
}

export async function loadKillersAddons():
Promise<{dependentContainer: DependentRouletteContainer<AddOnInfo>, rouletteBtns: RouletteButton<AddOnInfo>[], containers: { [key: string]: HTMLDivElement}}>
{
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers_add-ons/killers_add-ons.json")
    .then((response) => response.json())
    .then((addons: { [key :string]: AddOnInfo[] }) => {
        return loadAddOns(
            addons,
            'btn-killer-addon',
            document.getElementById("killers-addons-roulette") as HTMLDivElement,
            "imgs/addon-background.png"
        )
    })
}


export async function loadSurvivorsAddons():
Promise<{dependentContainer: DependentRouletteContainer<AddOnInfo>, rouletteBtns: RouletteButton<AddOnInfo>[], containers: { [key: string]: HTMLDivElement}}>
{
    return await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/items_add-ons/items_add-ons.json")
    .then((response) => response.json())
    .then((addons: { [key :string]: AddOnInfo[] }) => {
        return loadAddOns(
            addons,
            'btn-survivor-addon',
            document.getElementById("survivors-addons-roulette") as HTMLDivElement,
            "imgs/addon-background.png"
        )
    })
}