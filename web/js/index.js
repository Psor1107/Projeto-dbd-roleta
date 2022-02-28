

document.addEventListener("DOMContentLoaded", () => {
    load_killers_characters()
    .then(() => {
        load_killers_addons()
    })
    load_survivors_characters()

    load_killers_perks()
    load_survivors_perks()
    load_items()
    .then(() => {
        load_survivors_addons()
    })
})