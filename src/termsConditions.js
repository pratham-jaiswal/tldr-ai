import { Link } from "react-router-dom";

const termsSections = [
  {
    title: "1. Use of Service",
    content:
      "TL;DR AI provides AI-generated summaries of text and URLs. The service is intended for informational purposes only and should not be relied upon for legal, financial, or medical decisions.",
  },
  {
    title: "2. Rate Limits",
    content: "To ensure fair usage, each user is limited to:",
    list: [
      "2 AI-generated TL;DR requests per 6 hours.",
      "Unlimited retrieval of previously saved summaries.",
    ],
  },
  {
    title: "3. User Responsibilities",
    content: "You agree:",
    list: [
      "Not to use TL;DR AI for illegal or unethical activities.",
      "Not to scrape, reverse engineer, or misuse the API.",
      "To ensure that submitted URLs comply with copyright laws.",
    ],
  },
  {
    title: "4. Limitation of Liability",
    content:
      "We do not guarantee the accuracy of AI-generated summaries. TL;DR AI is provided 'as is' without any warranties. We are not responsible for any damages resulting from the use of our service.",
  },
  {
    title: "5. Data Retention",
    content:
      "Saved TL;DRs and URLs may be stored indefinitely unless requested for deletion by the user. We do not sell or share this data with third parties.",
  },
  {
    title: "6. Changes to These Terms",
    content:
      "We reserve the right to modify these Terms & Conditions at any time. Continued use of TL;DR AI after changes constitutes acceptance of the new terms.",
  },
  {
    title: "7. Contact Information",
    content: "For inquiries, please contact us at [Insert Contact Email].",
  },
];

export default function TermsConditions() {
  return (
    <div className="terms-container">
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
        <div className="terms-header">
          <h1>Terms & Conditions</h1>
          <p>Last Updated: [Insert Date]</p>
        </div>
      </div>

      <div className="terms-content">
        {termsSections.map(({ title, content, list }, index) => (
          <div key={index} className="terms-box">
            <h2>{title}</h2>
            <p>{content}</p>
            {list && (
              <ul>
                {list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
