
def get_overview(html):
    overview = ''
    killer_overview_object = html.find("span", id='Overview').findNext('p')
    while 'difficulty rating' not in killer_overview_object.text.lower():
        overview += killer_overview_object.text.strip() + "\n"
        killer_overview_object = killer_overview_object.findNext('p')
    return overview