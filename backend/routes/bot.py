from flask import jsonify, request

def bot_reply():
    question = request.json['message'].lower()

    # Dictionary mapping keywords to answers
    keywords = {
        "resume": "Ensure your resume highlights projects relevant to your job role, with clear achievements.",
        "strength": "Mention strengths like quick learning, adaptability, or teamwork, with real examples.",
        "weakness": "State a genuine weakness but show what you are doing to overcome it.",
        "project": "Explain your project with its objective, tools used, and your specific contributions.",
        "internship": "Describe your internship work, skills learned, and how it shaped your career goals.",
        "goal": "State your career goal aligned with the company and your growth plans.",
        "hobbies": "Include productive hobbies like coding, reading, or volunteering.",
        "self introduction": "Start with your name, education, skills, projects, and career goals.",
        "favourite subject": "Explain why you like it and how it relates to your career goals.",
        "why should we hire you": "Summarise your skills, dedication, and alignment with company objectives."
    }

    # Match based on keyword presence in question
    answer = None
    for key in keywords:
        if key in question:
            answer = keywords[key]
            break

    # Fallback dynamic generic answer
    if not answer:
        answer = f"I understand your question about '{question}'. Please prepare this topic thoroughly and relate it to real-life examples for interviews."

    return jsonify({"reply": answer})  # ✅ changed key to 'reply' for frontend match
