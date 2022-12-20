import { useContext } from "react";
import { Link } from "react-router-dom";
// import { useCountryFetch } from "../data/useFetch";
import { ThemeContext } from "../App";

export default function Country({ country }) {
  const { name, flags, population, capital, region, ccn3 } = country;
  const theme = useContext(ThemeContext);
  const populStr = population.toLocaleString();
  return (
    <article key={name.common} className={`element card ${theme}-element`}>
      <Link to={`/${ccn3}`}>
        <div>
          <img src={flags.png} alt={name.common} className="header-img" />
          <div>
            <h2>{name.common}</h2>
            <DataItem title="Population" details={populStr} />
            <DataItem title="Region" details={region} />
            <DataItem title="Capital" details={capital} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CountryDetails(props) {
  const theme = useContext(ThemeContext);
  const {
    flags,
    name = "None",
    population = "Unknown",
    region = "Unknown",
    subregion = "Unknown",
    capital = "Unknown",
    tld = "Unknown",
    currencies = "Unknown",
    languages = "Unknown",
    borders = [],
  } = props.country;

  const nativeNames = Object.values(name.nativeName);
  const nativeName = nativeNames[nativeNames.length - 1].common;
  const currency = Object.values(currencies)[0].name;
  const langs = Object.values(languages).join(", ");
  const populStr = population.toLocaleString();

  // ! deprecated code
  // const codes = borders.join(",");
  // const url = `https://restcountries.com/v3.1/alpha?codes=${codes}`;
  // const borderCountries = useCountryFetch(url);
  const borderCountries = borders.map((border) =>
    props.data.find((bcountry) => bcountry.cca3 === border)
  );
  return (
    <>
      {/* image */}
      <div className="fw-auto-3 mb-container ">
        <img src={flags.png} alt={name.common} className="w-100" />
      </div>
      {/* data */}
      <div className="fw-auto-4">
        <h2>{name.common}</h2>
        {/* country details */}
        <div className="flex f-auto-wrap f-gap-1">
          <div className="fw-auto-4 mb-container ">
            <DataItem title="Native Name" details={nativeName} />
            <DataItem title="Population" details={populStr} />
            <DataItem title="Region" details={region} />
            <DataItem title="Sub Region" details={subregion} />
            <DataItem title="Capital" details={capital} />
          </div>
          <div className="fw-auto-4 mb-container ">
            <DataItem title="Top Level Domain" details={tld} />
            <DataItem title="Currencies" details={currency} />
            <DataItem title="Languages" details={langs} />
          </div>
        </div>
        {/* bordering countries */}
        <div className="border-countries mb-container ">
          <h3>
            <b>Border Countries: </b>
          </h3>
          <div>
            {borderCountries.length > 0
              ? borderCountries.map((country) => {
                  const { name, ccn3 } = country;
                  return (
                    <Link to={`/borders/${ccn3}`} key={ccn3}>
                      <button className={`element mini ${theme}-element`}>
                        {name.common}
                      </button>
                    </Link>
                  );
                })
              : " None"}
          </div>
        </div>
      </div>
    </>
  );
}

function DataItem(props) {
  return (
    <p>
      <b>{props.title}:</b> {props.details}
    </p>
  );
}
