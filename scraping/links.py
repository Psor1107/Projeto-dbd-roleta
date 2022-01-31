from urllib.request import urlopen
from bs4 import BeautifulSoup
from killers import get_killer_info

# retorna uma lista de links para paginas de survivors ou killers
# passar o html completo (objeto beautifulsoup) da pagina de killer ou survival como argumento
def get_links(page_html):
    links = []
    page_content = page_html.find('div', id='mw-content-text').find('div').find('div', style='color: #fff;')
    for killer_box in page_content.findAll('div', class_='floatnone'):
        links.append("https://deadbydaylight.fandom.com" + killer_box.find('a').get('href'))
    return links



perks_html = urlopen("https://deadbydaylight.fandom.com/wiki/Killers").read()
soup = BeautifulSoup(perks_html, 'html.parser')
links = get_links(soup)

for link in links:
    killer_html = urlopen(link).read()
    soup = BeautifulSoup(killer_html, 'html.parser')
    get_killer_info(soup, "data/killers/icons", "")
