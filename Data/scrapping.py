from urllib.request import urlopen
from bs4 import BeautifulSoup
from matplotlib.pyplot import table



perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Perks").read()
soup = BeautifulSoup(perks_html, 'html.parser')

perks_tables = soup.findAll('table', class_='wikitable unknownClass')
survivors_perks_table = perks_tables[0]
killers_perks_table = perks_tables[1]

for table_row in survivors_perks_table.findAll('tr')[1:]:
    row_headers = table_row.findAll('th')
    icon_field = row_headers[0]
    name_field = row_headers[1]
    description_field = table_row.find('td')
    character_field = row_headers[2]


    print(f"{character_field}\n--------------------------\n")