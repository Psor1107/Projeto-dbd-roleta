import re
import unidecode

def format_name(name):
    name = re.sub("[\s!?:]", "", name.title())
    return unidecode.unidecode(name)
