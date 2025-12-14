import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sweets from "./pages/Sweets";
import "./styles.css";

function App() {
  const token = localStorage.getItem("token");
  const [showRegister, setShowRegister] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (token) {
    return (
      <div>
        {}
        <header className="app-header">
          <div className="header-left">
            <h1>Sweet Shop 🍬</h1>
          </div>

          <div className="header-right">
            {}
            <div className="cart-container" title="Cart">
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </div>

            {}
            <button
              className="about-text-btn"
              onClick={() => setShowAbout(true)}
            >
              About
            </button>

            {}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {}
        <Sweets setCartCount={setCartCount} />

        {}
        {showAbout && (
          <div className="about-overlay" onClick={() => setShowAbout(false)}>
            <div className="about-modal" onClick={(e) => e.stopPropagation()}>
              <h2>About Sweet Shop 🍭</h2>
              <p>
                We bring you the freshest traditional Indian sweets made with
                love ❤️. Perfect for festivals, celebrations, and everyday
                happiness.
              </p>
              <button onClick={() => setShowAbout(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="auth-container">
      {showRegister ? (
        <Register goToLogin={() => setShowRegister(false)} />
      ) : (
        <Login goToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;


