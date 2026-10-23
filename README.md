# LearnAI

**One topic. One complete learning experience.**

LearnAI is an AI-powered learning workspace for school, college, and university students. Instead of searching across notes, videos, and websites, a student enters one topic and receives a structured, personalised lesson with explanations, examples, visualisations, practice, and an AI-powered understanding check.

**Live demo:** [learnai-d4fy.vercel.app](https://learnai-d4fy.vercel.app)

## The problem

Students often learn from scattered resources that do not match their level or learning style. This makes it difficult to build a clear understanding of a topic and assess whether they have actually learned it.

LearnAI turns a single prompt, such as _“Teach me recursion from the basics”_, into one focused learning experience tailored to the student's academic profile and learning goal.

## Features

- AI-generated, structured lessons for any topic
- Personalised explanations using the student's education level, field of study, subjects, and learning preferences
- Real-life analogies, stories, visual step-throughs, animations, code examples, and practical applications
- Interactive quizzes and practice questions
- Teach-back activity: students explain a concept in their own words and receive AI feedback with an understanding score
- Contextual “Ask about this” tutor for lesson follow-up questions
- Saved learning sessions, search, history, and understanding progress
- Responsive, dark-first learning workspace with light and system themes

## How it works

```text
Student topic + learning goal + profile
                |
                v
          Flask API + Groq
                |
                v
  Validated lesson sections stored in SQLite
                |
                v
Interactive React learning workspace
```

The AI returns structured JSON. The backend validates and cleans every lesson section before the frontend renders it with reusable lesson-block components.

## Tech stack

| Area       | Technology                                          |
| ---------- | --------------------------------------------------- |
| Frontend   | React 19, TanStack Start/Router, Tailwind CSS, Vite |
| Backend    | Python, Flask, Flask-CORS                           |
| AI         | Groq API                                            |
| Data       | SQLite                                              |
| Deployment | Vercel multi-service deployment                     |

## Project structure

```text
.
├── backend/
│   ├── app.py          # Flask API routes
│   ├── ai.py           # Groq lesson generation, Q&A, and teach-back grading
│   ├── db.py           # SQLite session and history storage
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/ # Reusable UI, layout, chat, and learning blocks
│       ├── pages/      # Landing, authentication, home, and lesson pages
│       ├── context/    # Theme and learner-profile state
│       └── routes/     # TanStack file-based routes
└── vercel.json         # Routes /api/* to Flask and all other paths to React
```

## Run locally

### Prerequisites

- Node.js 20+
- Python 3.10+
- A [Groq API key](https://console.groq.com)

### 1. Start the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```powershell
# Windows PowerShell
.\venv\Scripts\Activate.ps1
```

```bash
# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env` from `backend/.env.example`, then add your key:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Run the API:

```bash
python app.py
```

The backend runs at `http://127.0.0.1:5000`.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite. The Vite development server proxies `/api` requests to Flask on port `5000`.

## API

| Method | Endpoint                  | Description                                       |
| ------ | ------------------------- | ------------------------------------------------- |
| `GET`  | `/api/health`             | Confirms the API is available                     |
| `POST` | `/api/lessons/generate`   | Generates and saves a lesson                      |
| `GET`  | `/api/sessions`           | Returns saved lessons grouped by date             |
| `GET`  | `/api/sessions/:id`       | Returns one saved lesson                          |
| `GET`  | `/api/history`            | Returns learning history and understanding scores |
| `POST` | `/api/teachback/evaluate` | Grades a student's teach-back response            |
| `POST` | `/api/ask`                | Answers contextual lesson questions               |

## Deploy to Vercel

This repository uses `vercel.json` to deploy the frontend and Flask backend together:

- `/api/*` is routed to the Flask service.
- All other routes are served by the TanStack Start frontend.

Add these environment variables in **Vercel → Project Settings → Environment Variables** before deployment:

```text
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Add them to Production, Preview, and Development as needed. Never commit the API key or a populated `.env` file.

> **Note:** Vercel serverless storage is temporary. SQLite is suitable for this hackathon demonstration, but a hosted database such as Supabase, Neon, or PostgreSQL should be used for persistent production learning history.

## Privacy

LearnAI sends only learning-relevant profile information to the AI service, such as education level, subjects, preferred explanation style, and language. A student's name and email are not included in the AI lesson-generation payload.

## Team

**Logic Masters**

- Bhamer Lal — Team Leader
- Jawad Haider — Team Member

## License

Built for the TECHGEN Society Hackathon 2026–27.

# LearnAI
