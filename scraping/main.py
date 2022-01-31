from urllib.request import urlopen
from bs4 import BeautifulSoup
from perks import retrieve_perks
from links import get_links
from killers import get_killer_info
from general_functions import save_json


print("Coletando informações dos perks...")
perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Perks").read()
soup = BeautifulSoup(perks_html, 'html.parser')
print("Informações dos perks coletadas")

perks_tables = soup.findAll('table', class_='wikitable unknownClass')
survivors_perks_table = perks_tables[0]
killers_perks_table = perks_tables[1]

project_repository = "https://raw.githubusercontent.com/GregorioFornetti/Projeto-dbd-roleta/main"
perks_path = "data/perks"

print("Coletando icones e formatando informações de perks de sobreviventes...")
retrieve_perks(survivors_perks_table, 
               f'{perks_path}/survivors_icons',
               f'{perks_path}/survivor_perks.json',
               project_repository)
print("Coleta de perks de sobreviventes realizada com sucesso.")
print("Coletando icones e formatando informações de perks de assassinos...")

retrieve_perks(killers_perks_table, 
               f'{perks_path}/killer_icons', 
               f'{perks_path}/killer_perks.json',
               project_repository)
print("Coleta de perks de assassinos realizada com sucesso.")


killers_icons_path = "data/killers/icons"
killers = []
print("Coletando links dos killers...")
killers_html = urlopen("https://deadbydaylight.fandom.com/wiki/Killers").read()
soup = BeautifulSoup(killers_html, 'html.parser')
links = get_links(soup)
print("Links coletados")

for link in links:
    print("Coletando informações do próximo killer...")
    killer_html = urlopen(link).read()
    soup = BeautifulSoup(killer_html, 'html.parser')
    killer_atual = get_killer_info(soup, killers_icons_path, project_repository)
    killers.append(killer_atual)
    print(f"Todas informações do {killer_atual['alias']} coletada com sucesso.")

save_json("data/killers/killers.json", killers)