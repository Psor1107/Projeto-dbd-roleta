from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
from perks import get_perks

perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Perks").read()
soup = BeautifulSoup(perks_html, 'html.parser')

perks_tables = soup.findAll('table', class_='wikitable unknownClass')
survivors_perks_table = perks_tables[0]
killers_perks_table = perks_tables[1]

survivors_perks_list = get_perks(survivors_perks_table)
killers_perks_list = get_perks(killers_perks_table)

with open('data/perks/survivor_perks.json', 'w') as surv_perks_file:
    json.dump(survivors_perks_list, surv_perks_file)
with open('data/perks/killer_perks.json', 'w') as killers_perks_file:
    json.dump(killers_perks_list, killers_perks_file)