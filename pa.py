from flask import Flask, request, jsonify
from flask_cors import CORS

import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/personal_assistant": {"origins": "https://mail.google.com"}})

@app.route('/personal_assistant', methods=['POST'])
def personal_assistant():
    # Get the JSON data from the request
    json_data = request.get_json()

    # Configure generativeai with API key
    genai.configure(api_key='<YOUR_API_KEY>')  # Replace '<YOUR_API_KEY>' with your actual API key
    model = genai.GenerativeModel('gemini-pro')

    # Create prompt
    prompt = "Act as a personal assistant and summarize the email content."
    prompt += "Email content: " + str(json_data)

    # Generate response
    response = model.generate_content(prompt)
    output = response.candidates[0].content.parts[0].text

    # Return assistant response
    response = {'assistant_response': output}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
