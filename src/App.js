import React, { useState, useContext, createContext } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./component/Navbar";
import Controller from "./component/Controller";
import { useCountryFetch } from "./data/useFetch";
import Country, { CountryDetails } from "./component/Country";

export const ThemeContext = createContext("light");

export default function App() {
  const [theme, setTheme] = useState("light");
  const url = "https://restcountries.com/v3.1/all";
  const data = useCountryFetch(url);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`h-100v ${theme}-background pb-1`}>
        <Navbar toggleTheme={toggleTheme} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <Home data={data} />} />
            <Route
              path="/borders/:countrycode"
              component={({ match }) => (
                <Redirect to={`/${match.params.countrycode}`} />
              )}
            />
            <Route
              path="/:countrycode"
              component={({ match }) => (
                <CountryPage
                  data={data}
                  countrycode={match.params.countrycode}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

function Home({ data }) {
  const [countryList, setCountryList] = useState(data);
  function handleController(value, type) {
    const regValue = new RegExp(value, "i");
    let countries = [];
    if (type === "search") {
      countries = data.filter((country) => country.name.common.match(regValue)); //return array
    } else if (type === "filter") {
      countries = data.filter((country) => country.region.match(regValue)); //return array
    }
    setCountryList(countries);
  }
  return (
    <>
      <Helmet>
        <title>Kiflan Adli | REST Countries API Project</title>
      </Helmet>
      <Controller handleController={handleController} />
      <section className="mx-2 grid">
        {countryList.map((country) => (
          <Country country={country} key={country.name.common} />
        ))}
      </section>
    </>
  );
}

function CountryPage({ data, countrycode }) {
  // ! deprecated code
  // const countrycode = match.params.countrycode;
  // const url = `https://restcountries.com/v3.1/alpha/${countrycode}`;
  // const data = useCountryFetch(url);
  const country = data.find((country) => country.ccn3 === countrycode);
  const theme = useContext(ThemeContext);
  return (
    <div>
      <Helmet>
        <title>Country | {country ? country.name.common : ""}</title>
      </Helmet>
      <div className="mx-1">
        <Link to="/">
          <button className={`element ${theme}-element`}>
            <div className="flex fy-center">
              <img
                src={`./assets/arrow-left-${theme}-mode.svg`}
                alt="icon"
                className="icon"
              />
              <span>Back</span>
            </div>
          </button>
        </Link>
        <div className="flex f-auto-wrap f-gap-2">
          {/* {data.status !== 400 && data.map(country => <CountryDetails country={country}/>)[0]} */}
          {country && <CountryDetails country={country} data={data} />}
        </div>
      </div>
    </div>
  );
}
