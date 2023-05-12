'''
	Contoh Deloyment untuk Domain Natural Language Processing (NLP)
	Orbit Future Academy - AI Mastery - KM Batch 3
	Tim Deployment
	2022
'''

# =[Modules dan Packages]========================

from fungsi import *
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from joblib import load
import re
import pickle
import nltk
nltk.download('stopwords')

# =[Variabel Global]=============================

app = Flask(__name__, static_url_path='/static')
model = None

stopwords_ind = None
key_norm = None
factory = None
stemmer = None
vocab = None

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]


@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]


@app.route("/api/deteksi", methods=['POST'])
def apiDeteksi():
    # Nilai default untuk string input
    text_input = ""

    if request.method == 'POST':
        # Set nilai string input dari pengguna
        text_input = request.form['data']

        # Text Pre-Processing
        text_input = text_preprocessing_process(
            text_input, key_norm, stopwords_ind, stemmer)

        # TF-IDF
        tf_idf_vec = TfidfVectorizer(vocabulary=set(vocab))

        # Prediksi (Penipuan, Promo, atau Normal)
        hasil = model.predict(tf_idf_vec.fit_transform([text_input]))
        if (hasil[0] == 'happy'):
            hasil_prediksi = "Happy"
        elif (hasil[0] == 'anger'):
            hasil_prediksi = "Anger"
        elif (hasil[0] == 'sadness'):
            hasil_prediksi = "Sadness"
        elif (hasil[0] == 'fear'):
            hasil_prediksi = "Fear"
        elif (hasil[0] == 'love'):
            hasil_prediksi = "Love"

        # Return hasil prediksi dengan format JSON
        return jsonify({
            "data": hasil_prediksi,
        })

# =[Main]========================================


if __name__ == '__main__':

    # Setup
    stopwords_ind = stopwords.words('indonesian')
    # stopwords_ind = stopwords_ind + more_stopword

    key_norm = pd.read_csv('kamus_singkatan.csv', names=[
                           'singkat', 'hasil'], header=None, sep=';')

    factory = StemmerFactory()
    stemmer = factory.create_stemmer()

    vocab = pickle.load(open('kbest_feature.pickle', 'rb'))

    # Load model yang telah ditraining
    model = load('model_1.joblib')

    # Run Flask di localhost
    app.run(host="localhost", port=5000, debug=True)
