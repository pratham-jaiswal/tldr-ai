import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Components/home";
import TLDR from "./Components/tldr";
import SavedTLDRs from "./Components/savedTldrs";
import About from "./Components/about";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import PrivacyPolicy from "./privacyPolicy";
import TermsConditions from "./termsConditions";
import Footer from "./Components/footer";
import ScrollToTop from "./Components/scrollToTop";

function App() {
  useEffect(() => {
    if (!Cookies.get("user_id")) {
      const userId = uuidv4();
      Cookies.set("user_id", userId, {
        expires: 6,
        secure: true,
        sameSite: "None",
      });
    }
  }, []);

  return (
    <div className="App">
      <a
        href="https://www.patreon.com/bePatron?u=109627851"
        target="_blank"
        rel="noopener"
        id="floating-patreon-btn"
        data-patreon-widget-type="become-patron-button"
        area-label="Become a Patron on Patreon"
      >
        <img width={20} src="https://res.cloudinary.com/dhzmockpa/image/upload/v1745674680/PATREON_SYMBOL_1_BLACK_RGB_trsdty.svg" alt="Become a Patron on Patreon" />
      </a>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tldr" element={<TLDR />} />
          <Route path="/about" element={<About />} />
          <Route path="/saved-tldrs" element={<SavedTLDRs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
