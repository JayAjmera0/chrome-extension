from __future__ import print_function
from flask import Flask, request, jsonify
from flask_cors import CORS


import pandas as pd
from seq2seq import Seq2SeqSummarizer
import numpy as np
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app, resources={r"/process_json": {"origins": "https://mail.google.com"}})

@app.route('/process_json', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    json_data = request.get_json()

    # Check if JSON data is present and contains 'content' key
    if json_data and 'content' in json_data:
        # Access the 'content' key from JSON data
        content = json_data['content']

        np.random.seed(42)
        model_dir_path = './'

        # Adjust this line
        config = np.load(Seq2SeqSummarizer.get_config_file_path(model_dir_path=model_dir_path), allow_pickle=True).item()

        # summarizer = Seq2SeqSummarizer(config)
        # summarizer.load_weights(weight_file_path=Seq2SeqSummarizer.get_weight_file_path(model_dir_path=model_dir_path))

        # result = summarizer.summarize(content)
        # Return the count as JSON response
        response = {'count': content}
        return jsonify(response), 200
    else:
        # Return an error if JSON data is not provided or does not contain 'content' key
        error_response = {'error': 'No JSON data provided or missing "content" key'}
        return jsonify(error_response), 400

if __name__ == '__main__':
    app.run(debug=True)
