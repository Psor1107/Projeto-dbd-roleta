
var survivors_roulette_buttons = []
var killers_roulette_buttons = []

document.addEventListener("DOMContentLoaded", () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips')
    load_killers_characters()
    .then(() => {
        load_killers_addons()
        .then(() => {
            btnLoadTooltips.click()
        })
    })
    load_survivors_characters()

    load_killers_perks()
    load_survivors_perks()
    load_items()
    .then(() => {
        load_survivors_addons()
        .then(() => {
            btnLoadTooltips.click()
        })
    })

    document.getElementById('btn-roullete-all-survivors').addEventListener('click', () => {
        for (let btn of survivors_roulette_buttons)
            btn.click()
    })

    document.getElementById('btn-roullete-all-killers').addEventListener('click', () => {
        for (let btn of killers_roulette_buttons)
            btn.click()
    })
})