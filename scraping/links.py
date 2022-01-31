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
