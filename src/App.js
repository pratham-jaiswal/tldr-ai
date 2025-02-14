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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tldr" element={<TLDR />} />
          <Route path="/about" element={<About />} />
          <Route path="/saved-tldrs" element={<SavedTLDRs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
