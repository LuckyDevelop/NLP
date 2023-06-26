from library import *


def convert_slang_to_normal(text):
    words = text.split()
    converted_text = []
    for word in words:
        if word.lower() in slang_words:
            converted_text.append(slang_words[word.lower()])
        else:
            converted_text.append(word)
    return " ".join(converted_text)
