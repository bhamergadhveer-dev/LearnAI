import re
import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS
from groq import APIConnectionError, RateLimitError

from ai import answer_question, evaluate_teachback, generate_lesson
from db import get_lesson, init_db, list_history, list_sessions, save_lesson, set_understanding

app = Flask(__name__)
CORS(app)
init_db()

# Only send fields that help teaching (no name or email) to the AI
PROFILE_KEYS = ["educationLevel", "fieldOfStudy", "subjects",
                "explanationStyle", "exampleStyle", "visualPreference", "language"]

# ---------- greetings / small talk: answered instantly, no AI call ----------
GREETING_WORDS = {
    "hi", "hii", "hiii", "hello", "helo", "hey", "heyy", "hola", "salam",
    "salaam", "assalamualaikum", "yo", "sup", "thanks", "thank", "thx",
    "ok", "okay", "bye",
}
SMALL_TALK = (
    "how are you", "whats up", "what's up", "good morning", "good afternoon",
    "good evening", "who are you", "assalam o alaikum", "assalam alaikum",
    "assalamu alaikum", "thank you",
)


def is_greeting(text):
    """True for short greetings / small talk, so they never become lessons."""
    t = re.sub(r"[^\w\s']", " ", text.lower())
    t = re.sub(r"\s+", " ", t).strip()
    words = t.split()
    if not words or len(words) > 5 or "world" in words:  # "hello world" is a real topic
        return False
    if any(t.startswith(p) for p in SMALL_TALK):
        return True
    return words[0] in GREETING_WORDS


def greeting_reply(text, name, on_generate=False):
    who = (name or "").strip() or "there"
    if re.match(r"^\s*(thank|thx)", text, re.I):
        return "You're welcome! Anything else you'd like to ask?"
    if on_generate:
        return f"Hey {who}! What would you like to learn today?"
    return f"Hey {who}! How can I help you today?"


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/lessons/generate")
def generate():
    data = request.get_json(force=True)
    topic = (data.get("topic") or "").strip()
    goal = data.get("goal", "Understand deeply")
    if not topic:
        return jsonify(error="Topic is required"), 400

    # "hi" is not a topic: reply instead of building a lesson
    if is_greeting(topic):
        return jsonify(greeting=greeting_reply(topic, data.get("name"), on_generate=True))

    profile = {k: (data.get("profile") or {}).get(k) for k in PROFILE_KEYS}

    try:
        lesson = generate_lesson(topic, goal, profile)
    except RateLimitError:
        return jsonify(error="AI limit reached. Wait a minute and try again."), 429
    except APIConnectionError:
        return jsonify(error="Can't reach the AI service. Check your internet connection."), 503
    except Exception as e:
        app.logger.exception(e)
        return jsonify(error="Could not generate the lesson. Try again."), 502

    lesson.update(id=uuid.uuid4().hex[:8], progress=0)
    save_lesson(lesson, goal)
    return jsonify(lesson)


@app.get("/api/sessions")
def sessions():
    return jsonify(groups=list_sessions())


@app.get("/api/sessions/<sid>")
def session_detail(sid):
    lesson = get_lesson(sid)
    if not lesson:
        return jsonify(error="Lesson not found"), 404
    return jsonify(lesson)


@app.get("/api/history")
def history():
    return jsonify(items=list_history())


# Shared error replies for the new endpoints
@app.errorhandler(RateLimitError)
def _rate_limited(_):
    return jsonify(error="AI limit reached. Wait a minute and try again."), 429


@app.errorhandler(APIConnectionError)
def _no_connection(_):
    return jsonify(error="Can't reach the AI service. Check your internet connection."), 503


@app.errorhandler(RuntimeError)
def _ai_failed(e):
    app.logger.exception(e)
    return jsonify(error="The AI gave an unusable answer. Try again."), 502


@app.post("/api/teachback/evaluate")
def teachback():
    data = request.get_json(force=True)
    lesson = get_lesson(data.get("lessonId") or "")
    if not lesson:
        return jsonify(error="Lesson not found"), 404
    answer = (data.get("answer") or "").strip()
    if len(answer) < 15:
        return jsonify(error="Write a little more so I can check it."), 400

    result = evaluate_teachback(lesson, answer)
    set_understanding(lesson["id"], result["score"])  # shows up in History
    return jsonify(result)


@app.post("/api/ask")
def ask():
    data = request.get_json(force=True)
    lesson = get_lesson(data.get("lessonId") or "")
    if not lesson:
        return jsonify(error="Lesson not found"), 404
    question = (data.get("question") or "").strip()
    if not question:
        return jsonify(error="Question is required"), 400

    # Greetings / thanks: short friendly reply, no AI call
    if is_greeting(question):
        return jsonify(answer=greeting_reply(question, data.get("name")))

    return jsonify(answer=answer_question(lesson, question, data.get("history")))


if __name__ == "__main__":
    app.run(port=5000, debug=True)