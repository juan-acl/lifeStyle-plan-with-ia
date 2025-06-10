# 🧠 LifeStyle Planner - Chat Assistant using LLM Studio + DeepSeek R1

This is a web-based assistant that helps users generate and refine a **personalized lifestyle plan**. The assistant is powered by **LLM Studio** using the **DeepSeek R1** language model.

It guides the user through a form to gather relevant information, then sends that data as a prompt to DeepSeek. The assistant replies with a lifestyle plan, and users can continue the conversation by giving feedback or asking for changes.

---

## 📌 Features

- ✅ Lifestyle Plan Generator from structured form input
- ✅ Chat interface with contextual conversation
- ✅ Response generation using DeepSeek R1 model
- ✅ Persistent chat history via `sessionStorage`
- ✅ Clean UI with loading indicators and conversation threading

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/juan-acl/lifeStyle-plan-with-ia
cd lifeStyle-plan-with-ia
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up LLM Studio with DeepSeek R1

You need access to [LLM Studio](https://lmstudio.ai/) and the DeepSeek R1 model. Follow these steps:

#### 🔧 Configure DeepSeek R1 in LM Studio:

1. Open LM Studio
2. Go to `Models > Community` tab
3. Search for: `deepseek-ai/deepseek-llm-67b-chat`
4. Click **Download** and wait for the model to finish
5. Once downloaded, click **Start Server** (on port `1234` by default)

> The app will connect to your local LLM Studio instance on `http://localhost:1234`.

### 4. Create a `.env` File

In the root directory, add a `.env` file:

```env
VITE_MODEL_LM_ESTUDIO=http://localhost:1234/v1/chat/completions
```

> You can also set this to another endpoint if you are proxying the LLM Studio server or using a hosted backend.

### 5. Run the App

```bash
pnpm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧾 How It Works

### 🔹 Form Entry

- The user is shown a modal form to enter personal preferences:
  - Name
  - Age
  - Occupation
  - Goals
  - Activity Level
  - Hobbies & Interests
  - Food Restrictions
  - Available Time

- This data is converted into a prompt via `generatePromptFromForm()` and sent to DeepSeek.

### 🔹 Chat Conversation

- Once the initial plan is generated, the user enters a chat mode.
- Feedback messages are sent along with the **last 6 messages** of the thread to provide **contextual understanding** for the assistant.
- All chat data is stored in `sessionStorage` under a unique `chat.id`.

### 🔹 Title Generation

- Each new conversation triggers a prompt that asks DeepSeek to **summarize the topic as a title**.
- This helps organize and display chat history clearly.

---

## 📁 Project Structure

```
/src
  /components
    Dashboard.tsx           --> Chat logic and lifecycle
    LifestyleForm.tsx       --> User form for lifestyle input
    Input.tsx               --> Text input component
    Chat/List/list.tsx      --> Message rendering
  /services
    createChat.services.ts  --> LLM Studio API wrapper
    sessionStorage.services.ts
  /pages
    index.tsx entry route
  /utils
    think.ts                --> Prompt formatting, context cleaning
```

---

## 🔐 Notes

- Currently uses `sessionStorage`, which means chat history is cleared when the browser or tab is closed.
- To make it persistent, you could replace it with `localStorage`, IndexedDB, or integrate with a backend (e.g. Firebase, Supabase, etc.)

---

## 🛠️ Future Improvements

- Add support for login and user-specific chat history
- Integrate analytics for engagement with each plan
- Support multi-language responses
- Save/export lifestyle plans as PDF

---

## 📬 Contact

For questions or contributions, feel free to submit issues or pull requests.

---

**Author:** Juan chuc (juan-acl on github)
**License:** MIT
