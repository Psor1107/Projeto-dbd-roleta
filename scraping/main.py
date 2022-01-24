from urllib.request import urlopen
from bs4 import BeautifulSoup
from perks import retrieve_perks


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
