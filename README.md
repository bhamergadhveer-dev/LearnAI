# AI Learn Studio

Do not simplify the requirements by removing features. Build the complete UI architecture described above, but keep the visual design minimal and uncluttered. Prioritize reusable components and clean JSX/Tailwind code over putting everything into one file.Build a complete, modern frontend UI for an AI-powered learning platform called "LearnAI".

IMPORTANT TECHNICAL REQUIREMENTS

================================

- Use React with JSX only.

- DO NOT use TypeScript.

- Do NOT create .ts or .tsx files.

- Use Tailwind CSS for styling.

- Use React Router DOM for routing.

- Use JavaScript (.js / .jsx) only.

- Use reusable React components.

- Add clear comments in the code explaining important components, sections, state, and non-obvious UI logic.

- Do not use inline styles unless absolutely necessary.

- Do not build a backend.

- Do not use real API calls.

- Use realistic mock data for chats, history, lessons, progress, profile, etc.

- All buttons and UI interactions should work visually using React state where appropriate.

- The application must be responsive and work properly on desktop, tablet, and mobile.

- Keep the code clean, modular, and easy to connect to a FastAPI backend later.

PRODUCT PURPOSE

===============

This is NOT a traditional LMS and NOT simply a ChatGPT clone.

The product is an AI learning/teaching platform specifically designed for school, college, and university students.

The core idea is:

"One topic. One complete learning experience."

A student should be able to enter something like:

"Teach me recursion from the basics."

The AI should eventually transform that single request into a complete learning experience containing things such as:

- Simple explanation

- Real-life example

- Story/analogy when useful

- Visual explanation

- Animation when useful

- Interactive example when useful

- Technical explanation

- Practical application

- Common mistakes

- Practice questions

- Quiz

- Teach-it-back activity

- Review/reinforcement

The frontend should therefore feel like an interactive learning workspace, NOT a conventional website with a large header and many navigation items.

DESIGN PHILOSOPHY

=================

The most important thing on the screen is the learning content.

Prioritize:

1. Focus

2. Understanding

3. Visual clarity

4. Interaction

5. Minimal distractions

6. Maximum available content space

Avoid unnecessary UI.

Do NOT create:

- Large traditional website navbar

- Large dashboard with dozens of cards

- Excessive buttons

- Excessive icons

- Social media style interface

- Complicated settings

- Huge hero sections inside the application

- Unnecessary statistics everywhere

- Too many colors

- Overly complicated animations

The UI should feel premium, calm, intelligent, modern, and focused.

Use a dark-first interface inspired by modern AI applications, but DO NOT copy Claude, ChatGPT, or any other existing product exactly.

Use the provided Claude-like sidebar concept only as a general UX reference:

- Compact sidebar

- Search

- New Learn

- Chats

- History

- Profile at bottom

- Collapsed icon-only state

- Expanded floating sidebar

Create an original visual identity for this product.

==================================================

GLOBAL LAYOUT

==================================================

The application should have a floating sidebar and a large learning workspace.

IMPORTANT:

The sidebar must NOT be attached directly to the browser edges.

It should have:

- Small margin from top

- Small margin from left

- Small margin from bottom

- Rounded corners

- Subtle border

- Subtle separation/shadow

- Floating appearance

Example concept:

    ┌──────────────────────┐

    │                      │

    │  Sidebar             │

    │                      │

    │                      │

    └──────────────────────┘

There should be visible space between the sidebar and:

- browser left edge

- browser top edge

- browser bottom edge

Use approximately:

- 12–16px outer spacing

- 14–18px border radius

==================================================

SIDEBAR

==================================================

The sidebar is one of the main navigation elements.

DEFAULT STATE:

--------------

The sidebar should normally be COLLAPSED.

Collapsed width should be approximately 64–72px.

When collapsed, show ONLY icons.

Example:

┌──────┐

│  🎓  │

│      │

│  🔍  │

│      │

│  ＋  │

│      │

│  💬  │

│      │

│  🕘  │

│      │

│      │

│      │

│  👤  │

└──────┘

Do not show text labels in collapsed state.

Add tooltips when hovering over icons:

- Search

- New Learn

- Chats

- History

- Profile

EXPANDED STATE:

---------------

When the user clicks the sidebar toggle, expand the sidebar to approximately 270–290px.

IMPORTANT:

The expanded sidebar should OVERLAY the main learning workspace.

It must NOT resize or push the main content.

The learning page should remain in the same position.

Example:

Collapsed:

Sidebar = 70px

Main = full available area

Expanded:

Sidebar = approximately 280px

Sidebar overlays the main content

The main content should NOT jump or resize.

Clicking outside the expanded sidebar should close it.

On mobile, the sidebar should behave as a floating overlay/drawer.

==================================================

SIDEBAR CONTENT

==================================================

Top:

- App logo / brand

- Sidebar collapse/expand button if needed

Navigation order:

1. Search

2. New Learn

3. Chats

4. History

There should be NO Settings item in the sidebar.

There should be NO separate profile page in the primary navigation.

BOTTOM:

Only the user's profile/avatar should appear at the bottom.

Example:

[Avatar] BHAMER

Clicking the profile opens a PROFILE MODAL.

==================================================

SEARCH

==================================================

Search should be a proper sidebar navigation item.

It should appear ABOVE "New Learn".

Example:

🔍 Search

＋ New Learn

💬 Chats

🕘 History

Search is primarily for finding previous learning sessions.

When clicked, show a clean search overlay/modal.

Example:

--------------------------------

Search your learning...

🔍 [ Search topics, chats... ]

Recent

TCP/IP

Python Functions

Recursion

SQL Joins

OSI Model

--------------------------------

Search results should use mock data.

Include:

- Search input

- Recent searches

- Matching learning sessions

- Empty state

- Clear search button

==================================================

NEW LEARN

==================================================

This is the PRIMARY action.

Label:

"+ New Learn"

When clicked, start a fresh learning session.

The main workspace should reset to the empty learning state.

==================================================

CHATS

==================================================

Chats represent previous learning sessions.

Show realistic mock learning sessions.

Example:

Today

- TCP/IP Basics

- Python Decorators

Yesterday

- Binary Search

- SQL JOIN

Previous

- OSI Model

- Recursion

- Database Normalization

Use realistic timestamps where useful.

Allow selecting a chat.

Selected chat should open inside the main learning workspace.

==================================================

HISTORY

==================================================

History should represent previously completed/recently studied topics.

Do not make this another giant dashboard.

Show a simple, clean history interface.

Example:

Recently learned:

TCP/IP

82% understanding

Recursion

64% understanding

SQL Joins

91% understanding

Include simple status/progress indicators.

==================================================

PROFILE MODAL

==================================================

The profile is ONLY accessible from the bottom sidebar.

Clicking the avatar/profile opens a modal.

The modal should contain mandatory/personal learning information and basic account controls.

Example:

Profile

[Avatar]

BHAMER

Student

Education Level

University

Field of Study

Information Technology

Learning Preferences

Visual • Practical • Interactive

Language

English

Appearance

System / Dark / Light

Account

Change password

Log out

Do NOT create a separate settings page.

Use a clean modal with sections.

==================================================

MAIN EMPTY LEARNING SCREEN

==================================================

This is the most important screen.

When there is no active learning session, show a minimal centered interface.

Example:

        ✦

        Good afternoon, BHAMER

        What do you want to learn?

        ┌──────────────────────────────────────────────┐

        │                                              │

        │ What do you want to learn?                   │

        │                                              │

        │                                              │

        │ +                         Learn deeply    ↑  │

        └──────────────────────────────────────────────┘

Do not create a traditional header.

Do not put a navigation bar above this.

The sidebar is the main navigation.

The learning input should receive most of the visual attention.

==================================================

CHAT / LEARNING INPUT

==================================================

The input must be large, rounded, spacious, and premium.

Reference style:

Large rounded dark input container.

Placeholder:

"What do you want to learn?"

Example user input:

"Explain recursion from the basics with a real-life example."

INPUT OPTIONS:

Only include important features.

DO NOT include voice.

DO NOT include microphone.

DO NOT include model selection.

DO NOT include temperature.

DO NOT include personality selector.

DO NOT include length selector.

DO NOT include excessive configuration.

The input should contain:

1. Add material button (+)

2. Learning goal selector

3. Submit button

--------------------------------------------------

ADD MATERIAL (+)

--------------------------------------------------

Clicking + opens a small menu:

- Upload PDF

- Upload Image

- Upload Notes / Text

This is important because students may have:

- Lecture slides

- PDF textbooks

- Class notes

- Screenshots

- Assignments

- Study material

Mock the upload UI only.

No backend upload required.

--------------------------------------------------

LEARNING GOAL

--------------------------------------------------

Show a compact selector such as:

"Learn deeply"

Options:

- Understand deeply

- Quick understanding

- Exam preparation

- Revision

Default:

"Understand deeply"

Keep this selector subtle.

The user should NOT have to configure many things before learning.

The AI should decide the appropriate teaching method automatically.

--------------------------------------------------

SUBMIT

--------------------------------------------------

Use a clean arrow/send button.

When clicked:

- Start a mock learning session

- Display the learning workspace

- Show a realistic loading/generating state briefly

- Then render mock lesson content

==================================================

LEARNING WORKSPACE

==================================================

This is the CORE PRODUCT SCREEN.

Do not make it look like a traditional LMS dashboard.

The content should be centered and readable.

Use a comfortable maximum content width.

Example:

                    Recursion

              Understanding the concept

        [lesson content]

The workspace should support dynamic lesson blocks.

==================================================

DYNAMIC LESSON BLOCKS

==================================================

Create reusable React components for:

1. ExplanationBlock

2. RealLifeExampleBlock

3. StoryBlock

4. VisualizationBlock

5. AnimationBlock

6. CodeBlock

7. InteractiveExampleBlock

8. PracticalApplicationBlock

9. CommonMistakesBlock

10. QuizBlock

11. TeachBackBlock

12. SummaryBlock

13. ReviewBlock

These are mock UI components for now.

The architecture should make it easy to later render blocks based on structured AI responses.

For example, conceptually:

lesson.sections.map(section => {

    switch(section.type) {

        case "explanation":

        case "example":

        case "visualization":

        case "quiz":

        ...

    }

})

Do not hardcode everything into one giant component.

==================================================

LEARNING EXPERIENCE

==================================================

Create a realistic example lesson for:

"Recursion"

The lesson should demonstrate the product's intended experience.

Suggested flow:

1. Simple explanation

2. Real-life analogy

3. Visual explanation

4. How recursion works

5. Code example

6. Step-by-step visualization

7. Practical use

8. Common mistakes

9. Practice question

10. Teach it back

11. Summary

Use realistic content, but keep it concise enough for a UI demonstration.

==================================================

EXPLANATION BLOCK

==================================================

Create a clean reading section.

Example:

## What is recursion?

A function that solves a problem by calling itself with a smaller version of the same problem.

Then provide a simple explanation.

Include an action:

"Explain differently"

When clicked, show options:

- Simpler

- Real-life example

- Visual explanation

- Step-by-step

This is an important product feature.

==================================================

REAL-LIFE EXAMPLE

==================================================

Create a visually distinct but subtle section.

Example:

"Imagine standing between two mirrors..."

Use storytelling/analogy when appropriate.

Do not overuse decorative cards.

==================================================

VISUALIZATION

==================================================

Create a visual placeholder/demo for interactive learning.

For recursion, show something like:

function countdown(3)

        ↓

function countdown(2)

        ↓

function countdown(1)

        ↓

Base case

Use simple animated transitions or visual step states.

This is only a frontend demonstration.

Do not require a real 3D engine.

==================================================

CODE BLOCK

==================================================

Create a professional code block with:

- Language label

- Copy button

- Line numbers if appropriate

- Syntax-style highlighting

- Run button as a visual/mock interaction

Use JavaScript/Python example code.

==================================================

QUIZ BLOCK

==================================================

Create an interactive multiple-choice question.

Example:

"What happens when a recursive function reaches its base case?"

Options:

A. It calls itself again

B. It stops the recursion

C. It creates a new function

D. It restarts

Allow the user to select an answer.

Show correct/incorrect feedback.

Use React state.

==================================================

TEACH-BACK BLOCK

==================================================

This is one of the product's signature features.

Prompt:

"Now teach it back."

Example:

"Explain recursion in your own words."

Use a textarea.

Button:

"Check my understanding"

Mock an AI evaluation response:

Understanding: 82%

✓ You understand the basic recursive call.

✓ You understand the base case.

Needs review:

⚠ When recursion stops.

Then show:

"Review this part"

==================================================

SUMMARY BLOCK

==================================================

At the end:

## Key Takeaways

- Recursion solves a problem through smaller versions of itself.

- Every recursive process needs a stopping condition.

- The base case prevents infinite calls.

Keep it visually clean.

==================================================

PRACTICE / REVIEW

==================================================

Include a simple final section:

"Ready to test yourself?"

[ Start Practice ]

Then show 3–5 questions.

Also show:

"Review later"

This should connect visually to the student's history/progress.

==================================================

LEARNING PROGRESS

==================================================

During a lesson, show very subtle progress.

For example:

Recursion

━━━━━━━━━━━━━━━━━━━━━━ 72%

Do NOT create huge dashboard cards.

Progress should remain secondary to the lesson itself.

==================================================

AI LEARNING CHAT

==================================================

The application is AI-powered, so students should be able to ask contextual follow-up questions.

However, chat should NOT replace the learning experience.

Provide a subtle "Ask about this" / contextual question area.

Example:

"Why does the base case matter?"

The AI response should appear in the context of the lesson.

Use mock responses.

==================================================

DASHBOARD / HOME AFTER LOGIN

==================================================

Keep the dashboard minimal.

Do NOT create a conventional LMS dashboard full of cards.

Show:

- Continue learning

- Recently learned

- Review today

Example:

Continue Learning

Recursion

72%

TCP/IP

48%

Review Today

3 concepts ready for review

That is enough.

==================================================

MY LEARNING / HISTORY

==================================================

Provide clean topic history with:

- Topic name

- Date

- Progress

- Understanding score

- Review status

Use mock data.

==================================================

RESPONSIVE DESIGN

==================================================

Desktop:

- Floating collapsed sidebar

- Expanded overlay sidebar

- Large learning workspace

Tablet:

- Sidebar remains compact

- Learning content adapts

Mobile:

- Sidebar becomes a floating drawer

- Main learning content gets full width

- Input becomes mobile-friendly

- Lesson blocks stack vertically

- Interactive visualizations remain horizontally scrollable where needed

- Modals fit the viewport

Never allow horizontal page overflow.

==================================================

VISUAL STYLE

==================================================

Use a premium dark-first design.

General characteristics:

- Dark charcoal/near-black background

- Slightly lighter surfaces

- Soft borders

- Subtle shadows

- Rounded corners

- Excellent typography

- Strong readability

- Minimal visual noise

Do not overuse gradients.

Do not use bright rainbow colors.

Use ONE primary accent color for important interactive actions.

Use muted secondary text.

The design should feel:

- Intelligent

- Calm

- Premium

- Modern

- Focused

- Academic

- Friendly

Avoid making it look childish.

This is for school, college, and university students.

==================================================

ANIMATION

==================================================

Use subtle UI transitions.

Examples:

- Sidebar opening

- Sidebar closing

- Modal opening

- Hover states

- Button interactions

- Lesson block appearance

- Quiz feedback

- Progress updates

Animations should support the experience, not distract from learning.

For actual educational animations, create reusable placeholder/demo components that can later be replaced by real interactive visualizations.

==================================================

COMPONENT ARCHITECTURE

==================================================

Organize the React project cleanly.

Suggested structure:

src/

├── components/

│   ├── layout/

│   │   ├── AppLayout.jsx

│   │   ├── Sidebar.jsx

│   │   ├── SidebarItem.jsx

│   │   └── ProfileModal.jsx

│   │

│   ├── learning/

│   │   ├── LearningInput.jsx

│   │   ├── LessonWorkspace.jsx

│   │   ├── ExplanationBlock.jsx

│   │   ├── ExampleBlock.jsx

│   │   ├── VisualizationBlock.jsx

│   │   ├── AnimationBlock.jsx

│   │   ├── CodeBlock.jsx

│   │   ├── QuizBlock.jsx

│   │   ├── TeachBackBlock.jsx

│   │   ├── SummaryBlock.jsx

│   │   └── ProgressBar.jsx

│   │

│   ├── chat/

│   │   ├── ChatList.jsx

│   │   ├── ChatItem.jsx

│   │   └── SearchModal.jsx

│   │

│   └── ui/

│       ├── Button.jsx

│       ├── Modal.jsx

│       ├── Dropdown.jsx

│       └── Tooltip.jsx

│

├── pages/

│   ├── Landing.jsx

│   ├── Login.jsx

│   ├── Signup.jsx

│   ├── Home.jsx

│   └── LearningSession.jsx

│

├── data/

│   └── mockData.js

│

├── App.jsx

└── main.jsx

Use a structure similar to this, but adjust it if needed for a cleaner implementation.

==================================================

ROUTING

==================================================

Use React Router DOM.

Routes:

/

    Landing page

/login

    Login

/signup

    Signup

/app

    Main learning application

/app/learn/:id

    Specific learning session

Do not create unnecessary routes.

==================================================

AUTH UI

==================================================

Create simple modern Login and Signup pages.

Login:

- Email

- Password

- Login button

- Continue demo button if useful

- Link to signup

Signup:

- Name

- Email

- Password

- Education level

- Field of study

- Signup button

These are UI-only.

No real authentication.

==================================================

IMPORTANT UX RULES

==================================================

1. The student should be able to start learning with almost no configuration.

2. The learning content should always be the main focus.

3. The sidebar should stay minimal.

4. Do not make the application feel like a generic LMS.

5. Do not make the application feel like a generic ChatGPT clone.

6. The AI should eventually decide whether a concept needs:

   - text

   - analogy

   - story

   - diagram

   - animation

   - simulation

   - code

   - quiz

   - practice

7. The frontend should be designed around this future capability.

8. Avoid huge amounts of text in the UI.

9. Use realistic mock content rather than lorem ipsum.

10. Every important interactive element should have a working visual interaction using React state.

==================================================

CODE QUALITY

==================================================

IMPORTANT:

- JSX only.

- JavaScript only.

- Tailwind CSS only for styling.

- NO TypeScript.

- NO TSX.

- NO .ts files.

- NO .tsx files.

Add comments throughout the code.

Comments should explain:

- Component purpose

- Important state

- Sidebar behavior

- Overlay behavior

- Lesson rendering

- Mock data

- Interactive quiz logic

- Modal logic

- Any non-obvious implementation

Do not add meaningless comments to every single line.

Keep components reusable.

Avoid giant components.

Keep mock data separated from UI components.

==================================================

FINAL RESULT

==================================================

The final result should feel like a real, production-quality AI learning product.

The most important visual hierarchy should be:

1. Learning content

2. Learning input

3. Interactive learning elements

4. Minimal navigation

5. Progress

6. Profile/settings

The user should open the application and immediately think:

"I can type any difficult topic here and start learning."

The interface should feel significantly more focused than a traditional LMS.

Build the complete frontend with realistic mock data and working frontend interactions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/410a117f-1384-4c4d-97ec-dd3df1e87231).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
