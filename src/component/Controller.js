import { useContext, useState } from "react";
import { ThemeContext } from "../App";

export default function Controller(props) {
  const theme = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  function handleChange(e) {
    const { value, name } = e.currentTarget;
    if (name === "search") {
      setSearchValue(value);
      setFilterValue("");
    } else if (name === "filter") {
      setFilterValue(value);
      setSearchValue("");
    }
    props.handleController(value, name);
  }
  return (
    <div className="flex fx-between f-auto-wrap mx-1">
      <div className={`fw-auto-1 element flex fy-center ${theme}-element`}>
        <img
          src={`./assets/magnifying-glass-${theme}-mode.svg`}
          alt="icon"
          className="icon"
        />
        <input
          type="text"
          name="search"
          placeholder="Search for a country..."
          value={searchValue}
          onChange={handleChange}
          className={`fw-100 ${theme}-text`}
        />
      </div>
      <div className={`fw-auto-2 element ${theme}-element`}>
        <select
          name="filter"
          onChange={handleChange}
          value={filterValue}
          className={`${theme}-element ${theme}-text`}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}
