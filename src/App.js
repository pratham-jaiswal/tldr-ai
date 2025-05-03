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
import PrivacyPolicy from "./privacyPolicy";
import TermsConditions from "./termsConditions";
import Footer from "./Components/footer";
import ScrollToTop from "./Components/scrollToTop";
import {
  Protect,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import axios from "axios";

function App() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const signInButtonRef = useRef(null);
  const signUpButtonRef = useRef(null);
  const signOutButtonRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/get-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUserDetails(response.data.userDetails);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="loader-container">
        <PropagateLoader color="#F4EEE0" />
      </div>
    );
  }

  const handleSignIn = () => {
    if (signInButtonRef.current && !isSignedIn) {
      signInButtonRef.current.click();
    }
  };

  const handleSignUp = () => {
    if (signUpButtonRef.current && !isSignedIn) {
      signUpButtonRef.current.click();
    }
  };

  const handleSignOut = () => {
    if (signOutButtonRef.current && isSignedIn) {
      signOutButtonRef.current.click();
    }
  };

  const handleConnectPatreon = () => {
    window.location.assign(`${process.env.REACT_APP_API_URL}/auth/patreon`);
  };

  const handleDisconnectPatreon = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/diconnect-patreon`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePledge = () => {
    window.open("https://www.patreon.com/bePatron?u=109627851", "_blank");
  };

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
        <img
          width={20}
          src="https://res.cloudinary.com/dhzmockpa/image/upload/v1745674680/PATREON_SYMBOL_1_BLACK_RGB_trsdty.svg"
          alt="Become a Patron on Patreon"
        />
      </a>
      <div style={{ display: "none" }}>
        <SignInButton
          mode="modal"
          ref={signInButtonRef}
          forceRedirectUrl={"/tldr"}
          signUpFallbackRedirectUrl={"/tldr"}
          signUpForceRedirectUrl={"/tldr"}
        />
        <SignUpButton
          mode="modal"
          ref={signUpButtonRef}
          forceRedirectUrl={"/tldr"}
          signUpFallbackRedirectUrl={"/tldr"}
          signUpForceRedirectUrl={"/tldr"}
        />
        <SignOutButton ref={signOutButtonRef} />
      </div>
      <div className="nav-header">
        <SignedOut>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </SignedOut>
        <SignedIn>
          <div className="patreon-menu-wrapper">
            <button className="patreon-menu-button">
              {userDetails & userDetails?.patreonDetails ? userDetails.patreonDetails.tier : "Free Tier"}
            </button>
            <div className="patreon-dropdown">
              <div>
                Tier: <i>{userDetails ? userDetails.patreonDetails.tier : "Free Tier"}</i>
              </div>
              <div>
                Rate Limit:{" "}
                <i>
                  {userDetails
                    ? userDetails.patreonDetails.rateLimit + " per 6 hrs"
                    : "1 per 6 hrs"}
                </i>
              </div>
              {userDetails ? (
                <>
                  <button onClick={handleDisconnectPatreon}>
                    Disconnect Patreon
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handlePledge}>Become a Patron</button>
                  <button onClick={handleConnectPatreon}>
                    Connect Patreon <br /> (Must Be a Patron)
                  </button>
                </>
              )}
            </div>
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </SignedIn>
      </div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Home signInButtonRef={signInButtonRef} />}
          />
          {isSignedIn && (
            <Route
              path="/tldr"
              element={
                <Protect>
                  <TLDR />
                </Protect>
              }
            />
          )}
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
