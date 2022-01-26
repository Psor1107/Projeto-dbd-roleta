
function create_perk_button(perk_json, page) {
    let button = document.createElement('button')
    button.type = 'button'
    button.dataset.bsToggle = "tooltip"
    button.dataset.bsPlacement = "top"
    button.title = perk_json['description']
    new bootstrap.Tooltip(button)

    let img_perk = document.createElement('img')
    img_perk.src = perk_json['icon']

    button.appendChild(img_perk)
    page.appendChild(button)
}

document.addEventListener("DOMContentLoaded", () => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    console.log(tooltipTriggerList[0])
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    create_perk_button()
})


fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/perks/killer_perks.json")
.then((response) => response.json())
.then(perks => {
    let killer_page = document.getElementById("killer_roulette-page")
    for (let perk_json of perks) {
        console.log(perk_json)
        create_perk_button(perk_json, killer_page)
    }
})
