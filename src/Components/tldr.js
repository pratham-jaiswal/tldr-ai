import { useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import axios from "axios";

export default function TLDR() {
  const [activeBtn, setActiveBtn] = useState("URL");
  const [urlInput, setUrlInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [selectedProvider, setSelectedProvider] =
    useState("OpenAI GPT-4o mini");
  const [useSave, setUseSave] = useState(true);
  const [useKnowledgeHub, setUseKnowledgeHub] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const urlInputPlaceholder = "https://en.wikipedia.org/wiki/TL;DR";
  const textAreaPlaceholder =
    'TL;DR or tl;dr, short for "too long; didn\'t read", is internet slang often used to introduce a summary of an online post or news article. It is also used as an informal interjection commenting that a block of text has been ignored due to its length.';

  const generateTLDRForURL = async () => {
    setMarkdownContent("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tldr/url`,
        {
          url: urlInput,
          provider: selectedProvider,
          shouldSave: useSave,
          useKnowledgeHub: useKnowledgeHub,
        },
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setMarkdownContent(response.data.tldr);
    } catch (error) {
      console.error("Error generating TL;DR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTLDRForText = async () => {
    setMarkdownContent("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tldr/text`,
        {
          content: textAreaInput,
          provider: selectedProvider,
        },
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMarkdownContent(response.data.tldr);
    } catch (error) {
      console.error("Error generating TL;DR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tldr-container">
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
        <h2 className="header-title">TL;DR AI</h2>
        <div className="header-right-icon">
          <Link to="/saved-tldrs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F4EEE0"
            >
              <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="middle-container">
        <div className="top-section">
          <div className="option-container">
            <div
              className={`option-btn left-btn ${
                activeBtn === "URL" ? "active" : ""
              }`}
              onClick={() => !isLoading && setActiveBtn("URL")}
            >
              URL
            </div>
            <div
              className={`option-btn right-btn ${
                activeBtn === "Text" ? "active" : ""
              }`}
              onClick={() => !isLoading && setActiveBtn("Text")}
            >
              Text
            </div>
          </div>
          <div className="content-options">
            {activeBtn === "URL" ? (
              <div className="input-area">
                <input
                  type="url"
                  placeholder={urlInputPlaceholder}
                  onChange={(e) => setUrlInput(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            ) : (
              <div className="input-area">
                <textarea
                  rows="10"
                  placeholder={textAreaPlaceholder}
                  onChange={(e) => setTextAreaInput(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                ></textarea>
              </div>
            )}
          </div>
          <div className="config-container">
            <div className="config-item row-1">
              <span>Provider: </span>
              <select
                name="provider"
                defaultValue="OpenAI GPT-4o mini"
                onChange={(e) => setSelectedProvider(e.target.value)}
                disabled={isLoading}
              >
                <option value="OpenAI GPT-4o mini">OpenAI GPT-4o mini</option>
                <option value="Cohere Command R">Cohere Command R</option>
              </select>
            </div>
            <div className="row-2">
              <div className="config-item">
                <label
                  className={activeBtn !== "URL" ? "disabled" : ""}
                  title="Save the TLDR and URL to the database"
                >
                  <input
                    type="checkbox"
                    name="save"
                    checked={useSave && activeBtn === "URL"}
                    onChange={() => setUseSave(!useSave)}
                    disabled={activeBtn !== "URL" || isLoading}
                  />
                  Save TLDR
                </label>
              </div>
              <div className="config-item">
                <label
                  className={activeBtn !== "URL" ? "disabled" : ""}
                  title="Retrieve TLDR from the database if available"
                >
                  <input
                    type="checkbox"
                    name="useKnowledgeHub"
                    checked={useKnowledgeHub && activeBtn === "URL"}
                    onChange={() => setUseKnowledgeHub(!useKnowledgeHub)}
                    disabled={activeBtn !== "URL" || isLoading}
                  />
                  Use Saved TLDR (If Any)
                </label>
              </div>
            </div>
            <div className="row-3">
              <button
                className="btn primary"
                onClick={
                  activeBtn === "URL" ? generateTLDRForURL : generateTLDRForText
                }
                disabled={
                  (activeBtn === "URL" ? !urlInput : !textAreaInput) ||
                  isLoading
                }
              >
                {isLoading ? "Generating..." : "Generate TL;DR"}
              </button>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
        </div>
      </div>
    </div>
  );
}
