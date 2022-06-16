import { loadItemsAddons, loadKillersAddons } from "./functions/loaders/loadAddons.js"
import loadItems from "./functions/loaders/loadItems.js"
import loadKillers from "./functions/loaders/loadKillers.js"
import { loadKillersPerks, loadSurvivors, loadSurvivorsPerks } from "./functions/loaders/loadIndependents.js"
import RouletteButton from "./classes/RouletteButton.js"
import clickAll from "./functions/clickAll.js"



document.addEventListener('DOMContentLoaded', () => {
    const btnLoadTooltips = document.querySelector('#btn-load-tooltips') as HTMLButtonElement
    const killersPerksRouletteBtns: RouletteButton<any>[] = []
    const survivorsPerksRouletteBtns: RouletteButton<any>[] = []
    const allKillerRelatedRouletteBtns: RouletteButton<any>[] = []
    const allSurvivorRelatedRouletteBtns: RouletteButton<any>[] = []

    loadKillersAddons()
    .then((object) => {
        allKillerRelatedRouletteBtns.push(...object.rouletteBtns)
        loadKillers(
            object.dependentContainer,
            object.rouletteBtns,
            object.containers
        )
        .then((rouletteBtns) => {
            allKillerRelatedRouletteBtns.unshift(...rouletteBtns)
            btnLoadTooltips.click()
        })
    })
    
    loadItemsAddons()
    .then((object) => {
        allSurvivorRelatedRouletteBtns.push(...object.rouletteBtns)
        loadItems(
            object.dependentContainer,
            object.rouletteBtns,
            object.containers
        )
        .then((rouletteBtns) => {
            allSurvivorRelatedRouletteBtns.unshift(...rouletteBtns)
            btnLoadTooltips.click()
        })
    })

    loadKillersPerks()
    .then((rouletteBtns) => {
        killersPerksRouletteBtns.push(...rouletteBtns)
        allKillerRelatedRouletteBtns.push(...rouletteBtns)
        btnLoadTooltips.click()
    })

    loadSurvivorsPerks()
    .then((rouletteBtns) => {
        survivorsPerksRouletteBtns.push(...rouletteBtns)
        allSurvivorRelatedRouletteBtns.push(...rouletteBtns)
        btnLoadTooltips.click()
    })

    loadSurvivors()
    .then((rouletteBtns) => {
        allSurvivorRelatedRouletteBtns.push(...rouletteBtns)
        btnLoadTooltips.click()
    })

    const btnRouletteAllKillersPerks = document.getElementById('btn-roullete-killers-perks') as HTMLButtonElement
    btnRouletteAllKillersPerks.addEventListener('click', () => clickAll(killersPerksRouletteBtns))

    const btnRouletteAllSurvivorsPerks = document.getElementById('btn-roullete-survivors-perks') as HTMLButtonElement
    btnRouletteAllSurvivorsPerks.addEventListener('click', () => clickAll(survivorsPerksRouletteBtns))

    const btnRouletteAllSurvivors = document.getElementById('btn-roullete-all-survivors') as HTMLButtonElement
    btnRouletteAllSurvivors.addEventListener('click', () => clickAll(allSurvivorRelatedRouletteBtns))

    const btnRouletteAllKillers = document.getElementById('btn-roullete-all-killers') as HTMLButtonElement
    btnRouletteAllKillers.addEventListener('click', () => clickAll(allKillerRelatedRouletteBtns))
})