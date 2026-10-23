/**
 * All mock data for the LearnAI frontend lives here.
 * Keeping it out of components makes it trivial to swap for FastAPI calls later:
 * every export below maps to a future API endpoint.
 */

// GET /me
export const user = {
  name: "BHAMER",
  role: "Student",
  initials: "B",
  educationLevel: "University",
  fieldOfStudy: "Information Technology",
  preferences: ["Visual", "Practical", "Interactive"],
  language: "English",
};

// GET /sessions  (grouped by recency for the sidebar)
export const chatGroups = [
  {
    label: "Today",
    items: [
      { id: "tcp-ip", title: "TCP/IP Basics", time: "10:24" },
      { id: "python-decorators", title: "Python Decorators", time: "09:02" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { id: "binary-search", title: "Binary Search", time: "18:41" },
      { id: "sql-join", title: "SQL JOIN", time: "15:12" },
    ],
  },
  {
    label: "Previous",
    items: [
      { id: "osi-model", title: "OSI Model", time: "Mon" },
      { id: "recursion", title: "Recursion", time: "Sun" },
      { id: "normalization", title: "Database Normalization", time: "Sat" },
    ],
  },
];

// Flat lookup used by search and the session route
export const allSessions = chatGroups.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.label })),
);

// GET /history
export const history = [
  {
    id: "tcp-ip",
    topic: "TCP/IP",
    date: "Today",
    progress: 100,
    understanding: 82,
    review: "Due today",
  },
  {
    id: "recursion",
    topic: "Recursion",
    date: "Sunday",
    progress: 72,
    understanding: 64,
    review: "Needs review",
  },
  {
    id: "sql-join",
    topic: "SQL Joins",
    date: "Yesterday",
    progress: 100,
    understanding: 91,
    review: "Mastered",
  },
  {
    id: "osi-model",
    topic: "OSI Model",
    date: "Monday",
    progress: 88,
    understanding: 77,
    review: "Due in 2 days",
  },
];

// Home screen: minimal "continue / review" data
export const continueLearning = [
  { id: "recursion", topic: "Recursion", progress: 72 },
  { id: "tcp-ip", topic: "TCP/IP", progress: 48 },
];

export const reviewToday = { count: 3, label: "concepts ready for review" };

export const recentSearches = [
  "TCP/IP",
  "Python Functions",
  "Recursion",
  "SQL Joins",
  "OSI Model",
];

// Learning goal selector options (kept intentionally short)
export const learningGoals = [
  "Understand deeply",
  "Quick understanding",
  "Exam preparation",
  "Revision",
];

/**
 * A generated lesson.
 * `sections` is an ordered list of typed blocks — the renderer switches on
 * `type`, so an AI response with the same shape will render with no UI changes.
 */
export const recursionLesson = {
  id: "recursion",
  title: "Recursion",
  subtitle: "Understanding the concept",
  progress: 72,
  sections: [
    {
      type: "explanation",
      heading: "What is recursion?",
      body: "A function that solves a problem by calling itself with a smaller version of the same problem. Each call shrinks the problem until it becomes trivial enough to answer directly — that trivial answer is called the base case.",
      points: [
        "The function calls itself with simpler input.",
        "A base case stops the chain of calls.",
        "Answers are combined as the calls return.",
      ],
    },
    {
      type: "example",
      heading: "A real-life example",
      body: "Imagine standing between two mirrors. Each mirror reflects the other's reflection, slightly smaller each time, until the reflection is too small to see. Recursion works the same way: each call is a smaller reflection of the original problem, and the point where you can no longer see is the base case.",
    },
    {
      type: "story",
      heading: "The stack of envelopes",
      body: "You are handed an envelope. Inside is a smaller envelope, and inside that another one. You keep opening until you find an envelope with a note that says 'stop — the answer is 1'. Then you close each envelope back up, writing the running answer on the outside as you go. Opening is the recursive descent; closing is the return.",
    },
    {
      type: "visualization",
      heading: "How the calls unfold",
      steps: [
        "countdown(3)",
        "countdown(2)",
        "countdown(1)",
        "countdown(0) → base case",
      ],
      caption: "Each call waits for the one below it to finish.",
    },
    {
      type: "animation",
      heading: "The call stack in motion",
      frames: [
        ["countdown(3)"],
        ["countdown(3)", "countdown(2)"],
        ["countdown(3)", "countdown(2)", "countdown(1)"],
        ["countdown(3)", "countdown(2)", "countdown(1)", "base case"],
        ["countdown(3)", "countdown(2)", "countdown(1)"],
        ["countdown(3)", "countdown(2)"],
        ["countdown(3)"],
        [],
      ],
      caption: "Frames push on the way down and pop on the way back up.",
    },
    {
      type: "code",
      heading: "In code",
      language: "python",
      code: `def factorial(n):
    # Base case: stops the recursion
    if n <= 1:
        return 1
    # Recursive case: a smaller version of the same problem
    return n * factorial(n - 1)

print(factorial(5))  # 120`,
      output: "120",
    },
    {
      type: "interactive",
      heading: "Try it yourself",
      body: "Change n and watch how many recursive calls are needed.",
    },
    {
      type: "practical",
      heading: "Where you will actually use it",
      items: [
        "Walking folder trees and file systems",
        "Parsing JSON, HTML and nested structures",
        "Divide and conquer algorithms: merge sort, quicksort",
        "Traversing trees and graphs (DFS)",
      ],
    },
    {
      type: "mistakes",
      heading: "Common mistakes",
      items: [
        {
          wrong: "Forgetting the base case",
          right: "Always write the stopping condition first — without it you get infinite recursion.",
        },
        {
          wrong: "The input never gets smaller",
          right: "Each call must move closer to the base case, e.g. n - 1 instead of n.",
        },
        {
          wrong: "Recursing too deep",
          right: "Very deep recursion overflows the call stack; prefer iteration for large inputs.",
        },
      ],
    },
    {
      type: "quiz",
      heading: "Quick check",
      question: "What happens when a recursive function reaches its base case?",
      options: [
        "It calls itself again",
        "It stops the recursion and starts returning",
        "It creates a new function",
        "It restarts from the beginning",
      ],
      correctIndex: 1,
      explanation:
        "The base case returns a value directly instead of calling the function again, so the pending calls can resolve in reverse order.",
    },
    {
      type: "teachback",
      heading: "Now teach it back",
      prompt: "Explain recursion in your own words.",
    },
    {
      type: "summary",
      heading: "Key takeaways",
      points: [
        "Recursion solves a problem through smaller versions of itself.",
        "Every recursive process needs a stopping condition.",
        "The base case prevents infinite calls.",
        "Values are combined as the calls unwind.",
      ],
    },
    {
      type: "review",
      heading: "Ready to test yourself?",
    },
  ],
};

// Practice questions used by the ReviewBlock
export const practiceQuestions = [
  {
    q: "What is the purpose of a base case?",
    options: ["Speed up the function", "Stop the recursion", "Save memory"],
    correctIndex: 1,
  },
  {
    q: "Which structure does recursion rely on internally?",
    options: ["The call stack", "The heap", "A queue"],
    correctIndex: 0,
  },
  {
    q: "Which problem is naturally recursive?",
    options: ["Summing an array once", "Traversing a tree", "Reading one line"],
    correctIndex: 1,
  },
];

// Mocked AI evaluation returned by the teach-back block
export const teachBackEvaluation = {
  score: 82,
  correct: [
    "You understand the basic recursive call.",
    "You understand the base case.",
  ],
  review: ["When recursion stops and how values return."],
};

// Mocked contextual follow-up answers ("Ask about this")
export const followUpAnswers = {
  default:
    "Good question. The base case is what makes recursion finite: it is the smallest version of the problem whose answer you already know, so the function can return instead of calling itself again.",
};

/** Returns a lesson for any session id — all demo topics reuse the recursion lesson body. */
export function getLessonById(id) {
  const session = allSessions.find((s) => s.id === id);
  if (!session) return recursionLesson;
  return {
    ...recursionLesson,
    id,
    title: session.title,
    subtitle: "Understanding the concept",
  };
}

/* -------------------------------------------------------------------------
 * Student profile (personalization payload)
 *
 * This object is intentionally structured so it can later be POSTed to the
 * backend together with the learning question, e.g.:
 *   { topic, goal, profile: { educationLevel, fieldOfStudy, subjects, ... } }
 * Only fields that help the AI teach better are collected.
 * ---------------------------------------------------------------------- */
export const defaultProfile = {
  name: "BHAMER",
  email: "bhamer@student.edu",
  educationLevel: "University",
  institution: "City University",
  program: "BSc Information Technology",
  fieldOfStudy: "Information Technology",
  yearSemester: "Year 2 · Semester 4",
  subjects: [
    { id: 1, name: "Data Structures", level: "Intermediate" },
    { id: 2, name: "Computer Networks", level: "Beginner" },
  ],
  learningGoals: ["Understand deeply", "Exam preparation"],
  explanationStyle: "Simple and step-by-step",
  exampleStyle: "Real-life analogies",
  visualPreference: "Diagrams and animations",
  language: "English",
};

// Option lists used by the profile form.
export const educationLevels = [
  "School",
  "High School",
  "College",
  "University",
  "Postgraduate",
];
export const subjectLevels = ["Beginner", "Intermediate", "Advanced"];
export const explanationStyles = [
  "Simple and step-by-step",
  "Concise and to the point",
  "Detailed and academic",
  "Conversational",
];
export const exampleStyles = [
  "Real-life analogies",
  "Code examples",
  "Math / formulas",
  "Story-based",
];
export const visualPreferences = [
  "Diagrams and animations",
  "Text first, visuals when needed",
  "Mostly text",
];
export const languages = ["English", "Urdu", "Hindi", "Arabic", "Spanish"];
