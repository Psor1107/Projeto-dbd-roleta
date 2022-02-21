
var killers_addons
const available_killers_addons = {}
const enabled_killers_addons = {}
const selected_killers_addons = {}


async function load_killers_addons() {
    await fetch("https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main/data/killers_add-ons/killers_add-ons.json")
    .then((response) => response.json())
    .then(addons => {
        killers_addons = addons
    })
}