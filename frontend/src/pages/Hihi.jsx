import React, { useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";

function Hihi() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <p>The current mode is {isDarkMode ? "Dark Mode" : "Light Mode"}.</p>
      </div>
    </>
  );
}

export default Hihi;
