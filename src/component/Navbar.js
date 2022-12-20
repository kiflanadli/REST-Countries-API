import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Navbar(props) {
  const theme = useContext(ThemeContext);
  return (
    <nav className={`flex fy-center fx-between container ${theme}-container`}>
      <h1>Where in the world?</h1>
      <button
        className={`btn-clean flex fy-center ${theme}-text`}
        onClick={props.toggleTheme}
      >
        <img
          src={`./assets/change-${theme}-mode.svg`}
          alt="icon"
          className="icon i-close"
        />
        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>
    </nav>
  );
}
