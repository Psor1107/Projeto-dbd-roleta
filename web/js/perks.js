
var killers_perks
const available_killers_perks = []
const enabled_killers_perks = []
const selected_killers_perks = []

var survivors_perks
const available_survivors_perks = []
const enabled_survivors_perks = []
const selected_survivors_perks = []

function select_perk_button(perk_button, enabled_perks, available_perks, selected_perks) {
    perk_button.enabled = true
    enabled_perks.push(perk_button.perk_index)
    if (selected_perks.indexOf(perk_button.perk_index) == -1) {
        available_perks.push(perk_button.perk_index)
    }
    perk_button.className = perk_button.className.replace(" btn-perk-desabled", " btn-perk-enabled")
}

function deselect_perk_button(perk_button, enabled_perks, available_perks) {
    perk_button.enabled = false
    removeItem(enabled_perks, perk_button.perk_index)
    removeItem(available_perks, perk_button.perk_index)
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

function create_perk_button(perk_json, perk_index, enabled_perks, available_perks, selected_perks) {
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let button = document.createElement('button')
    button.className = 'bg-dark btn-perk btn-perk-hover btn-perk-enabled'
    button.perk_index = perk_index
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        if (btn.enabled) {
            deselect_perk_button(btn, enabled_perks, available_perks)
        } else {
            select_perk_button(btn, enabled_perks, available_perks, selected_perks)
        }
    })
    select_perk_button(button, enabled_perks, available_perks, selected_perks)
    
    let perk_img = create_perk_icon_with_tooltip(perk_json)
    
    button_box.appendChild(button)
    button.appendChild(perk_img)
    return button_box
}


function create_perk_button_roulette(perks) {
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
        let selected_perk_json = perks[selected_perk_index]
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
    killers_perks = perks
    let killer_modal = document.getElementById("modal-perks-killers-body")
    for (let i = 0; i < perks.length; i++) {
        killer_modal.appendChild(create_perk_button(perks[i], i, enabled_killers_perks, available_killers_perks, selected_killers_perks))
    }

    let roulette_container = document.getElementById("killers-perks-roulette")
    for (let i = 0; i < 4; i++) {
        roulette_container.appendChild(create_perk_button_roulette(killers_perks))
    }

    document.getElementById('btn-select-all-perks-killers').addEventListener("click", () => {
        for (let perk_box of killer_modal.children) {
            let perk_button = perk_box.children[0]
            if (!perk_button.enabled) {
                select_perk_button(perk_button, enabled_killers_perks, available_killers_perks, selected_killers_perks)
            }
        }
    })

    document.getElementById('btn-deselect-all-perks-killers').addEventListener("click", () => {
        for (let perk_box of killer_modal.children) {
            let perk_button = perk_box.children[0]
            if (perk_button.enabled) {
                deselect_perk_button(perk_button, enabled_killers_perks, available_killers_perks)
            }
        }
    })

    document.getElementById('btn-roullete-killers-perks').addEventListener('click', () => {
        for (let perk_box of roulette_container.children) {
            let perk_button = perk_box.children[0].children[0]
            perk_button.click()
        }
    })
})


fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/survivor_perks.json")
.then((response) => response.json())
.then(perks => {
    survivors_perks = perks
    let survivors_modal = document.getElementById("modal-perks-survivors-body")
    for (let i = 0; i < perks.length; i++) {
        survivors_modal.appendChild(create_perk_button(perks[i], i, enabled_survivors_perks, available_survivors_perks, selected_survivors_perks))
    }

    let roulette_container = document.getElementById("survivors-perks-roulette")
    for (let i = 0; i < 4; i++) {
        roulette_container.appendChild(create_perk_button_roulette(survivors_perks))
    }

    document.getElementById('btn-select-all-perks-survivors').addEventListener("click", () => {
        for (let perk_box of survivors_modal.children) {
            let perk_button = perk_box.children[0]
            if (!perk_button.enabled) {
                select_perk_button(perk_button, enabled_survivors_perks, available_survivors_perks, selected_survivors_perks)
            }
        }
    })

    document.getElementById('btn-deselect-all-perks-survivors').addEventListener("click", () => {
        for (let perk_box of survivors_modal.children) {
            let perk_button = perk_box.children[0]
            if (perk_button.enabled) {
                deselect_perk_button(perk_button, enabled_survivors_perks, available_survivors_perks)
            }
        }
    })

    document.getElementById('btn-roullete-survivors-perks').addEventListener('click', () => {
        for (let perk_box of roulette_container.children) {
            let perk_button = perk_box.children[0].children[0]
            perk_button.click()
        }
    })
})
