from urllib.request import urlopen
from bs4 import BeautifulSoup
import json



perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Perks").read()
soup = BeautifulSoup(perks_html, 'html.parser')

perks_tables = soup.findAll('table', class_='wikitable unknownClass')
survivors_perks_table = perks_tables[0]
killers_perks_table = perks_tables[1]

survivors_perks_list = []
for table_row in survivors_perks_table.findAll('tr')[1:]:
    perk = {}
    row_headers = table_row.findAll('th')
    icon_field = row_headers[0]
    name_field = row_headers[1]
    description_field = table_row.find('td')
    character_field = row_headers[2]
    perk['name'] = name_field.a.text

    
    survivors_perks_list.append(perk)

print(survivors_perks_list)
with open('data/teste.json', 'w') as surv_perks_file:
    json.dump(survivors_perks_list, surv_perks_file)
