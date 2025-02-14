import { Link } from "react-router-dom";

export default function About() {
  const aboutSections = [
    {
      title: "Our Mission",
      content:
        "TL;DR AI helps users quickly understand lengthy articles, papers, and content by generating concise summaries. Our goal is to make information more accessible and easier to consume.",
    },
    {
      title: "How It Works",
      content: "TL;DR AI offers two ways to generate summaries:",
      list: [
        "From a URL: Paste a link and get a summary of its content.",
        "From Text: Enter text manually to generate a concise summary.",
      ],
    },
    {
      title: "AI Model Options",
      content: "Users can choose between:",
      list: ["OpenAI GPT-4o mini", "Cohere Command R"],
    },
    {
      title: "Database Features",
      content: "",
      list: [
        "Users can save generated TL;DRs when using the URL option.",
        "Users can opt to fetch a saved summary, which is retrieved if available in the database.",
      ],
    },
    {
      title: "Rate Limits",
      content: "",
      list: [
        "Users are limited to 2 AI-generated TL;DRs per 6 hours.",
        "Fetching a previously saved summary does not count towards this limit.",
      ],
    },
    {
      title: "Why Choose TL;DR AI?",
      content: "",
      list: [
        "Quick and accurate summarization using top AI models.",
        "Save and retrieve summaries from our database for future reference.",
        "Flexible options for generating summaries from URLs or text.",
        "Optimized for efficiency with minimal rate limitations.",
      ],
    },
  ];

  return (
    <div className="about-container">
      <div className="header">
        <div className="header-left-icon">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F4EEE0"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </Link>
        </div>
        <header className="about-header">
          <h1>About TL;DR AI</h1>
          <p>Making long content digestible with AI-powered summarization.</p>
        </header>
      </div>
      <section className="about-content">
        {aboutSections.map((section, index) => (
          <div key={index} className="about-box">
            <h2>{section.title}</h2>
            {section.content && <p>{section.content}</p>}
            {section.list && (
              <ul>
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
      <footer className="about-footer">
        <Link to="/tldr" className="btn back-btn">
          Try TL;DR AI
        </Link>
      </footer>
    </div>
  );
}
