import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import remarkGfm from "remark-gfm";
import axios from "axios";

export default function SavedTLDRs() {
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const summariesPerPage = 5;

  useEffect(() => {
    const fetchSavedTLDRsPromise = axios
      .get(`${process.env.REACT_APP_API_URL}/fetch-saved-tldrs`, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setSavedSummaries(response.data.savedTLDRs);
        setFilteredSummaries(response.data.savedTLDRs);
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });

    toast.promise(
      fetchSavedTLDRsPromise,
      {
        pending: "Fetching Saved TL;DRs...",
        success: "👌 TL;DRs fetched successfully!",
      },
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  }, []);

  useEffect(() => {
    const filtered = savedSummaries.filter((item) =>
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSummaries(filtered);
    setCurrentPage(1);
  }, [searchTerm, savedSummaries]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastSummary = currentPage * summariesPerPage;
  const indexOfFirstSummary = indexOfLastSummary - summariesPerPage;
  const currentSummaries = filteredSummaries.slice(
    indexOfFirstSummary,
    indexOfLastSummary
  );

  const totalPages = Math.ceil(filteredSummaries.length / summariesPerPage);

  return (
    <div className="saved-tldrs-container">
      <div className="header-container">
        <div className="header-left-icon">
          <Link to="/tldr">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F4EEE0"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>
        </div>
        <h1>Saved TL;DRs</h1>
        <div className="header-right-icon">
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
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="main-container">
        {currentSummaries.length !== 0 && (
          <ul className="saved-list">
            {currentSummaries.map((item, index) => (
              <li key={index} className="saved-item">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saved-link"
                >
                  {item.url}
                </a>
                <hr />
                <Markdown className="saved-summary" remarkPlugins={[remarkGfm]}>
                  {item.tldr}
                </Markdown>
              </li>
            ))}
          </ul>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-container">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
