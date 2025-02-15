import { Link } from "react-router-dom";

const privacySections = [
  {
    title: "1. Data We Collect",
    content:
      "We do not collect any personally identifiable information from users. The only data we store includes:",
    list: [
      "URLs submitted for summarization (if the user opts to save them).",
      "The corresponding TL;DR summaries (if the user opts to save them).",
    ],
    extra:
      "We do not store user names, email addresses, IP addresses, or any other personal data.",
  },
  {
    title: "2. Third-Party Services",
    content:
      "We use third-party Large Language Models (LLMs), including OpenAI and Cohere, to generate summaries.",
    list: [
      <a
        href="https://openai.com/policies/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        OpenAI Privacy Policy
      </a>,
      <a
        href="https://cohere.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cohere Privacy Policy
      </a>,
    ],
    extra:
      "While we do not collect personal data, we cannot guarantee the data collection policies of these third-party services.",
  },
  {
    title: "3. Use of Cookies",
    content:
      "We use cookies to assign a unique user ID to prevent excessive API requests. These cookies do not store any personal information and are used solely for rate-limiting purposes.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement industry-standard security measures to protect stored TL;DRs and URLs. However, we cannot guarantee absolute security due to the nature of the internet.",
  },
  {
    title: "5. Your Rights",
    content: "You have the right to:",
    list: [
      "Request deletion of any saved TL;DRs and URLs by contacting us.",
      "Opt not to save any summaries by disabling the save feature.",
    ],
  },
  {
    title: "6. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be reflected on this page with a revised 'Last Updated' date.",
  },
  {
    title: "7. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at,",
    list: [
      <a
        href="mailto:contact@prathamjaiswal.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        contact@prathamjaiswal.com
      </a>,
      <a
        href="mailto:prathamj0502@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        prathamj0502@gmail.com
      </a>,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="policy-container">
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
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p>Last Updated: 15th February 2025</p>
        </div>
      </div>

      <div className="policy-content">
        {privacySections.map(({ title, content, list, extra }, index) => (
          <div key={index} className="policy-box">
            <h2>{title}</h2>
            <p>{content}</p>
            {list && (
              <ul>
                {list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {extra && <p>{extra}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
