# Placement-Pro-Chatbot

## Overview

Placement-Pro-Chatbot is a full-stack application designed to help students prepare for placement and interview rounds. It combines a Python Flask backend with a React frontend to provide resume-based question generation, answer evaluation, and a mock interview chatbot.

The app supports two main flows:

- **Resume upload + role selection**: parses a PDF resume, extracts keywords, and generates role-specific interview questions.
- **Mock answer evaluation**: accepts user answers and evaluates them using semantic similarity and sentiment analysis.
- **Chatbot mode**: provides quick interview preparation responses using a keyword-based chatbot.

---

## Project Structure

```
placement-pro-chatbot/
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── answer.py
│   │   ├── bot.py
│   │   └── resume.py
│   └── venv/
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── RoleSelection.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   └── FinalChatBot.jsx
│   │   └── components/
│   └── README.md
└── README.md
```

---

## Backend Details

The backend is built with Python and Flask. It exposes three API endpoints:

- `POST /api/upload_resume`
  - Accepts a PDF resume file and a selected role.
  - Parses the resume text using `PyMuPDF`.
  - Extracts keywords like `Python`, `React`, `Machine Learning`, etc.
  - Returns role-appropriate interview questions plus keyword-based questions.

- `POST /api/evaluate`
  - Accepts a user answer and a question key.
  - Uses `SentenceTransformer` to compute semantic similarity between the user's answer and a stored ideal answer.
  - Uses `TextBlob` for sentiment analysis.
  - Returns similarity score, polarity, subjectivity, feedback, and the ideal answer.

- `POST /api/bot_reply`
  - Accepts a user message.
  - Replies using simple keyword matching.
  - Falls back to a generic response when no keywords match.

### Backend files

- `backend/app.py`
  - Main Flask application.
  - Sets up routes and enables CORS.

- `backend/routes/answer.py`
  - Answer evaluation logic.
  - Contains the sentiment and similarity scoring code.

- `backend/routes/resume.py`
  - Resume parsing logic.
  - Extracts keywords and generates interview questions.

- `backend/routes/bot.py`
  - Keyword-based chatbot responses.

---

## Frontend Details

The frontend is built with React and Vite. It provides a multi-page UI for selecting a role, uploading a resume, answering questions, and chatting with a bot.

### Main pages

- `frontend/src/pages/RoleSelection.jsx`
  - Lets the user select a role and upload a PDF resume.
  - Sends the file and role to the backend.
  - Stores generated questions locally and navigates to the chat flow.

- `frontend/src/pages/ChatPage.jsx`
  - Displays a sequence of interview questions.
  - Sends each answer to the backend for evaluation.
  - Saves scores in `localStorage` and moves to the next question.

- `frontend/src/pages/FinalChatBot.jsx`
  - Displays a chat UI.
  - Sends free-form messages to the backend chatbot endpoint.

- `frontend/src/App.jsx`
  - Defines routes using React Router.
  - Points to `/`, `/chat`, `/summary`, and `/finalchatbot`.

---

## Technologies Used

- Backend
  - Python
  - Flask
  - Flask-CORS
  - sentence-transformers
  - TextBlob
  - PyMuPDF
  - Torch

- Frontend
  - React
  - React Router
  - Axios
  - Vite
  - Tailwind CSS

---

## Setup and Run Instructions

### Backend Setup

1. Open PowerShell in `placement-pro-chatbot/backend`
2. Activate the existing virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

3. Install dependencies if needed:

```powershell
pip install flask flask-cors sentence-transformers textblob PyMuPDF
```

4. Start the server:

```powershell
python app.py
```

5. Confirm the backend is running at:

```text
http://localhost:5000
```

### Frontend Setup

1. Open PowerShell in `placement-pro-chatbot/frontend`
2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

4. Open the local URL shown by Vite, typically:

```text
http://localhost:5173
```

---

## Usage Flow

1. Open the frontend in a browser.
2. Choose a role and upload your resume PDF.
3. Start the mock interview flow.
4. Answer the questions displayed on the chat page.
5. See evaluation feedback for each answer.
6. Use the final chatbot page to ask additional placement preparation questions.

---

## Notes

- The resume parser uses simple keyword extraction and is not a full resume analysis engine.
- The chatbot is rule-based and replies based on keyword matching only.
- Answer evaluation compares the user response to fixed "ideal answers".

---


