from library import *
from function import *
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_url_path='/static')


@app.route("/")
def beranda():
    return render_template('home.html')


@app.route("/api/deteksi", methods=['POST'])
def apiDeteksi():
    text_input = ""
    if request.method == 'POST':
        text_input = request.form['data']
        texts_p = []
        prediction_input = text_input
        prediction_input = convert_slang_to_normal(prediction_input)
        prediction_input = [letters.lower(
        ) for letters in prediction_input if letters not in string.punctuation]
        prediction_input = ''.join(prediction_input)
        texts_p.append(prediction_input)
        prediction_input = tokenizer.texts_to_sequences(texts_p)
        prediction_input = np.array(prediction_input).reshape(-1)
        prediction_input = pad_sequences([prediction_input], input_shape)
        output = model.predict(prediction_input)
        output = output.argmax()
        response_tag = le.inverse_transform([output])[0]

        if response_tag == "makanan":
            return jsonify({
                "data": responses[response_tag],
                "type": response_tag
            })
        else:
            return jsonify({
                "data": random.choice(responses[response_tag]),
                "type": response_tag
            })
# =[Main]========================================


if __name__ == '__main__':

    # Setup

    # Run Flask di localhost
    app.run(host="localhost", port=5000, debug=True)
