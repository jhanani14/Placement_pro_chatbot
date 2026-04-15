from flask import Flask, request, jsonify
from flask_cors import CORS

# Import route functions from routes folder
from routes.answer import evaluate_answer
from routes.resume import parse_resume
from routes.bot import bot_reply  # ✅ bot_reply imported

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Route for evaluating answers
@app.route('/api/evaluate', methods=['POST'])
def eval_answer():
    data = request.json
    return evaluate_answer(data)

# Route for uploading and parsing resume
@app.route('/api/upload_resume', methods=['POST'])
def upload_resume():
    file = request.files['file']
    return parse_resume(file)

# Route for chatbot reply
@app.route('/api/bot_reply', methods=['POST'])
def bot():
    return bot_reply() 

if __name__ == '__main__':
    app.run(debug=True)
