
function select_perk_button(button) {
    button.selected = true
    button.style.background = "fixed"
    button.style.backgroundColor = "black"
}

function deselect_perk_button(button) {
    button.selected = false
    button.style.background = "none"
}

function create_perk_button(perk_json, page) {
    let button_box = document.createElement('div')
    button_box.className = 'col'

    let button = document.createElement('button')
    button.className = 'btn-perk-sm'
    select_perk_button(button)
    button.addEventListener('click', (event) => {
        let btn = event.target.parentElement
        if (btn.selected) {
            deselect_perk_button(btn)
        } else {
            select_perk_button(btn)
        }
    })
    
    let perk_img = document.createElement('img')
    perk_img.className = 'img-fluid'
    perk_img.dataset.bsToggle = "tooltip"
    perk_img.dataset.bsPlacement = "top"
    perk_img.title = perk_json['description']
    perk_img.src = perk_json['icon']
    perk_img.draggable = false
    new bootstrap.Tooltip(perk_img)
    
    button_box.appendChild(button)
    button.appendChild(perk_img)
    page.appendChild(button_box)
}


fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
.then((response) => response.json())
.then(perks => {
    let killer_page = document.getElementById("modal-killer-body")
    for (let perk_json of perks) {
        create_perk_button(perk_json, killer_page)
    }
})
