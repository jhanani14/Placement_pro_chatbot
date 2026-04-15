from flask import jsonify
from sentence_transformers import SentenceTransformer, util
from textblob import TextBlob

model = SentenceTransformer('all-MiniLM-L6-v2')

ideal_answers = {
    "self_intro": "My name is John Doe. I completed my B.Tech in Computer Science from XYZ University. I am a quick learner with skills in Python and Web Development.",
    "oop": "Object-oriented programming is a paradigm based on objects containing data and code.",
    "data_cleaning": "Data cleaning is the process of correcting or removing inaccurate records from a dataset.",
    "ml": "Machine learning is a subset of AI that uses statistical techniques to enable computers to learn from data.",
    "python": "Python is a high-level, interpreted programming language known for its simplicity.",
    "project": "I did a project on chatbot development using Flask and React for placement preparation.",
    "strengths": "My strengths include quick learning, teamwork, and problem solving.",
    "weakness": "I tend to be a perfectionist, so I spend extra time refining work.",
    "future_goal": "I want to work as a data scientist in a reputed company.",
    "internship": "I did an internship in AI and ML at Novitech where I worked on real-time projects."
}

def evaluate_answer(data):
    user_ans = data['user_answer']
    question_key = data['question_key']
    ideal_ans = ideal_answers.get(question_key, "")

    sim_score = util.pytorch_cos_sim(
        model.encode(user_ans, convert_to_tensor=True),
        model.encode(ideal_ans, convert_to_tensor=True)
    ).item()

    sentiment = TextBlob(user_ans).sentiment

    if sim_score > 0.7:
        feedback = "Excellent answer! You covered the key points well."
    elif sim_score > 0.4:
        feedback = "Good attempt. Try to include definitions or examples."
    else:
        feedback = "Needs improvement. Review this topic and try again."

    return jsonify({
        "similarity": round(sim_score, 2),
        "polarity": round(sentiment.polarity, 2),
        "subjectivity": round(sentiment.subjectivity, 2),
        "feedback": feedback,
        "ideal_answer": ideal_ans
    })
