import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./context/financial-record-context";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import logo from "./assets/logo.png"


const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      {location.pathname === "/" && (
        <div className="navbar-content">
          <div className="navbar-left">
            <img src={logo} alt="FinBud Logo" className="navbar-logo" />
            <h2 className="navbar-title">FinBud</h2>
          </div>
          <div className="navbar-right">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
            <Link to="/auth" className="navbar-login-button">
                Log In
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
      {location.pathname === "/auth" && (
        <SignedOut>
          <Link to="/" className="navbar-link">Dashboard</Link>
        </SignedOut>
      )}
    </div>
  )
}
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
        <Route path="/auth" element={<Auth />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
