
# Snack Pack 🍱

<div align="center">

<!-- You can replace this placeholder with an actual screenshot of your hero section later -->
<img src="https://cdn.discordapp.com/attachments/1038853022702374943/1441803072463700008/Screenshot_2025-11-22_201548.png?ex=69231f3f&is=6921cdbf&hm=1c2969036a4e6a2b20908c9db55c2cb1d16799332ff8e811823f3c86f362ebd1&" alt="Snack Pack Banner" width="100%" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">

<br />

<h2 align="center">Intelligent Snacking, Delivered.</h2>

<p align="center">
  A modern food delivery platform featuring a smart Bento-Grid interface and an <b>AI-Powered Snack Sommelier</b>.
</p>

<div align="center">

[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8e75b2?logo=google&logoColor=white&style=for-the-badge)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)

</div>

</div>

---

## 🚀 About The Project

**Snack Pack** reimagines the food delivery experience by moving away from traditional lists and embracing a highly interactive, visual-first approach. 

Built with **React 19** and **Tailwind CSS**, it features a responsive **Bento Grid** layout and integrates **Google's Gemini 2.5 Flash** model to provide personalized snack recommendations based on user mood and context.

### ✨ Key Features

*   **🤖 AI Snack Genius:** Uses the Gemini API with structured JSON output to analyze abstract user moods (e.g., "Just finished a marathon") and generate a complete snack profile including calories, description, and match reasoning.
*   **🎨 Bento Grid Architecture:** A modern, tile-based layout that showcases features, simulations, and promotions in a responsive grid.
*   **🌗 Adaptive Theming:** Seamless Dark/Light mode toggle with persisted state and smooth color transitions.
*   **⚡ Simulation UI:** Features a real-time delivery tracking simulation built with React hooks and `requestAnimationFrame`.
*   **💎 Glassmorphism & Animations:** Extensive use of backdrop blurs, floating 3D blobs, and custom electric glow animations defined in Tailwind configuration.

---

## 🧠 AI Integration

The core intelligence of Snack Pack is powered by the `@google/genai` SDK.

**Model:** `gemini-2.5-flash`

We utilize **Structured Output (JSON Schema)** to ensure the LLM returns strictly typed data that fits directly into our TypeScript interfaces, avoiding the need for regex parsing.

```typescript
// code excerpt from services/geminiService.ts

const schema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    calories: { type: Type.NUMBER },
    tags: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }
    },
    matchReason: { type: Type.STRING }
  },
  required: ["name", "description", "calories", "tags", "matchReason"],
};

// The result is perfectly typed for our frontend components
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});
```

---

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | React 19 | Component architecture, Hooks, Suspense |
| **Language** | TypeScript | Strong typing for AI responses and Props |
| **Styling** | Tailwind CSS | Utility-first styling, Custom Keyframes, Dark Mode |
| **AI** | Google Gemini API | Natural Language Processing, Structured Generation |
| **Icons** | Lucide React | Modern, consistent iconography |

---

## 🏃 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/snack-pack.git
    cd snack-pack
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory (or ensure `process.env.API_KEY` is available in your environment):
    ```bash
    API_KEY=your_google_gemini_api_key
    ```

4.  **Run the application**
    ```bash
    npm start
    ```

---

## 📂 Project Structure

```text
/
├── components/          # React Components
│   ├── BentoGrid.tsx    # Main feature grid
│   ├── SnackGenius.tsx  # AI Interaction component
│   ├── Hero.tsx         # Landing section
│   └── ...
├── services/
│   └── geminiService.ts # API configurations and calls
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main entry point
└── index.html           # Tailwind config & entry
```

---

## 🎨 UI Showcase

### The Snack Genius
A specialized UI component that accepts natural language input, communicates with Gemini, and renders the result using a "Scramble Text" effect for a futuristic feel.

### Dynamic Pricing
Interactive pricing cards that switch between Monthly and Yearly billing with instant price calculations and highlighting for best value plans.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ using <b>Gemini 2.5</b></p>
</div>
