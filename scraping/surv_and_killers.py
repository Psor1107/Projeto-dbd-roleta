
def get_overview(html):
    overview = ''
    overview_object = html.find("span", id='Overview').findNext('p')
    while 'difficulty rating' not in overview_object.text.lower() and overview_object.text != '\n':
        overview += overview_object.text.strip() + "\n"
        overview_object = overview_object.findNext('p')
    return overview