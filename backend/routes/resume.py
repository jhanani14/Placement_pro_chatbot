from flask import jsonify, request
import fitz  # PyMuPDF
import re

def parse_resume(file):
    role = request.form.get("role", "")
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()

    # Extract keywords (simple example)
    keywords = re.findall(r"(Python|Java|Machine Learning|Data Science|SQL|React|Flask)", text, re.I)
    keywords = list(set([k.capitalize() for k in keywords]))

    # Generate role-specific sample questions
    role_questions = []
    if role.lower() == "data scientist":
        role_questions = [
            "Explain a machine learning project you've worked on.",
            "How do you handle missing data in a dataset?"
        ]
    elif role.lower() == "software developer":
        role_questions = [
            "Explain OOP concepts with examples.",
            "What are REST APIs and how do you use them?"
        ]
    else:
        role_questions = ["Describe your favorite AI model and its applications."]

    # Generate personalized questions based on resume keywords
    keyword_questions = [f"Tell me about your experience with {kw}." for kw in keywords]

    # Combine and remove duplicates
    generated_questions = list(set(role_questions + keyword_questions))

    return jsonify({
        "status": "success",
        "keywords": keywords,
        "generated_questions": generated_questions
    })
