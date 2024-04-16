from urllib.request import urlopen
from bs4 import BeautifulSoup
from perks import retrieve_perks
from links import get_links
from killers import get_killer_info, get_killers_addons
from survivors import get_survivor_info
from general_functions import save_json, definePageRowCollumn
from items import get_items_info, get_items_addons
import os 

project_repository = "https://raw.githubusercontent.com/Psor1107/Projeto-dbd-roleta/main/"

if os.path.exists("data") :
   print("Coletando informações dos perks...")
   perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Perks").read()
   soup = BeautifulSoup(perks_html, 'html.parser')
   print("Informações dos perks coletadas")

   perks_tables = soup.findAll('table', class_='wikitable sortable')
   survivors_perks_table = perks_tables[0]
   killers_perks_table = perks_tables[1]

   project_repository = "https://raw.githubusercontent.com/Psor1107/Projeto-dbd-roleta/main/"
   perks_path = "data/perks"

   print("Coletando icones e formatando informações de perks de sobreviventes...")
   retrieve_perks(survivors_perks_table, 
                  f'{perks_path}/survivors_icons',
                  f'{perks_path}/survivor_perks.json',
                  project_repository)