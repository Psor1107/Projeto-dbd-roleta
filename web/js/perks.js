
var killer_perks
const available_killers_perks = []
const enabled_killers_perks = []
const selected_killers_perks = []

function select_perk_button(perk_button) {
    perk_button.enabled = true
    enabled_killers_perks.push(perk_button.perk_index)
    if (selected_killers_perks.indexOf(perk_button.perk_index) == -1) {
        available_killers_perks.push(perk_button.perk_index)
    }
    perk_button.className = perk_button.className.replace(" btn-perk-desabled", " btn-perk-enabled")
}

function deselect_perk_button(perk_button) {
    perk_button.enabled = false
    removeItem(enabled_killers_perks, perk_button.perk_index)
    removeItem(available_killers_perks, perk_button.perk_index)
    perk_button.className = perk_button.className.replace(" btn-perk-enabled", " btn-perk-desabled")
}

function create_perk_icon_with_tooltip(perk_json) {
    let perk_img = document.createElement('img')
    perk_img.className = 'img-fluid'
    perk_img.dataset.bsToggle = "tooltip"
    perk_img.dataset.bsPlacement = "top"
    perk_img.title = perk_json['description']
    perk_img.src = perk_json['icon']
    perk_img.draggable = false
    perk_img.tooltip = new bootstrap.Tooltip(perk_img)
    return perk_img
}

function create_perk_button(perk_json, perk_index) {
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let button = document.createElement('button')
    button.className = 'bg-dark btn-perk btn-perk-hover btn-perk-enabled'
    button.perk_index = perk_index
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        if (btn.enabled) {
            deselect_perk_button(btn)
        } else {
            select_perk_button(btn)
        }
    })
    select_perk_button(button)
    
    let perk_img = create_perk_icon_with_tooltip(perk_json)
    
    button_box.appendChild(button)
    button.appendChild(perk_img)
    return button_box
}


function create_perk_button_roulette() {
    let perk_box = document.createElement('div')
    perk_box.className = 'col'

    let button = document.createElement('button')
    button.className = 'btn-perk btn-perk-roulette'
    perk_box.appendChild(button)
    button.addEventListener('click', (event) => {
        if (available_killers_perks.length == 0) {
            alert("Nenhum perk para selecionar !")
            return
        }
        let btn_roulette = event.target.parentElement
        let selected_perk_index = random_item(available_killers_perks)
        let selected_perk_json = killer_perks[selected_perk_index]
        if (btn_roulette.children[0].tooltip)
            btn_roulette.children[0].tooltip.dispose()
        btn_roulette.innerHTML = ''
        btn_roulette.appendChild(create_perk_icon_with_tooltip(selected_perk_json))

        if (btn_roulette.previous_index !== undefined) {
            if (enabled_killers_perks.indexOf(btn_roulette.previous_index) != -1)
                available_killers_perks.push(btn_roulette.previous_index)
            removeItem(selected_killers_perks, btn_roulette.previous_index)
        }

        btn_roulette.previous_index = selected_perk_index
        removeItem(available_killers_perks, selected_perk_index)
        selected_killers_perks.push(selected_perk_index)
    })

    let img = document.createElement('img')
    img.className = 'img-fluid'
    img.src = 'imgs/perk-background2.png'

    button.appendChild(img)
    perk_box.appendChild(button)
    return perk_box
}

fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
.then((response) => response.json())
.then(perks => {
    killer_perks = perks
    let killer_modal = document.getElementById("modal-killer-body")
    for (let i = 0; i < perks.length; i++) {
        killer_modal.appendChild(create_perk_button(perks[i], i))
    }

    let roulette_container = document.getElementById("killer-perks-roulette")
    for (let i = 0; i < 4; i++) {
        roulette_container.appendChild(create_perk_button_roulette())
    }

    document.getElementById('btn-select-all-perks-killers').addEventListener("click", () => {
        for (let perk_box of killer_modal.children) {
            let perk_button = perk_box.children[0]
            if (!perk_button.enabled) {
                select_perk_button(perk_button)
            }
        }
    })

    document.getElementById('btn-deselect-all-perks-killers').addEventListener("click", () => {
        for (let perk_box of killer_modal.children) {
            let perk_button = perk_box.children[0]
            if (perk_button.enabled) {
                deselect_perk_button(perk_button)
            }
        }
    })

    document.getElementById('btn-roullete-killer-perks').addEventListener('click', () => {
        for (let perk_box of roulette_container.children) {
            let perk_button = perk_box.children[0].children[0]
            perk_button.click()
        }
    })
})
