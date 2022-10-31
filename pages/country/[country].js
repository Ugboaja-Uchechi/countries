import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Country.module.css";

export const getStaticPaths = async () => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  // const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        country: item.name.common.toLowerCase(),
      }
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const name = context.params.country;
  const { data } = await axios.get("https://restcountries.com/v3.1/name/" + name);
  console.log(data)
  let res = await axios.get("https://restcountries.com/v3.1/all");
  let receivedData = res.data
  return {
    props: {
      country: data[0],
      countries: receivedData
    },
  }
};

const Details = ({ country, countries }) => {
  const singleCountry = countries.map((item) => {
    return { cca3: item.cca3, name: item.name.common };
  });

  const singleBorder = country.borders
    ? country.borders.map((border) => {
      return border;
    })
    : "";

  const countryMatch = singleBorder
    ? singleCountry.filter((item) =>
      singleBorder.some((bord) => bord == item.cca3)
    )
    : [];

  const currencies = country.currencies
    ? Object.values(country.currencies)
    : [];
  const languages = country.languages ? Object.values(country.languages) : [];
  return (
    <main>
      <div className={styles.btnCover}>
        <Link href='/'>
          <button className={styles.link}>Back</button>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.imgCover}>
          <Image src={country.flags.svg} alt={`${country.name.common} Flag`} layout="fill" />
        </div>
        <div>
          <h1 className={styles.heading}>{country.name.common}</h1>
          <div className={styles.flexCover}>
            <div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Commom Name:</h2>
                <p className={styles.text}>{country.name.common}</p>
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Population:</h2>
                <p className={styles.text}>{country.population}</p>
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Region:</h2>
                <p className={styles.text}>{country.region}</p>
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Sub Region:</h2>
                <p className={styles.text}>{country.subregion ? country.subregion : "No sub region"}</p>
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Capital:</h2>
                <p className={styles.text}>{country.capital ? country.capital : "No capital"}</p>
              </div>
            </div>
            <div className={styles.mLeft}>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Top Level Domain:</h2>
                {country.tld
                  ? country.tld.map((item) => {
                    return (
                      <p key={item} className={styles.text}>
                        {item}
                      </p>
                    );
                  })
                  : "No TLD"}
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Currencies:</h2>
                {currencies.length > 0
                  ? currencies.map((curr) => {
                    return (
                      <p key={curr.name} className={styles.text}>
                        {curr.name}
                      </p>
                    );
                  })
                  : <p className={styles.text}>No currencies</p>}
              </div>
              <div className={styles.subHeadingCover}>
                <h2 className={styles.subHeading}>Language(s):</h2>
                {languages.length > 0
                  ? languages.map((lang) => {
                    return (
                      <p key={lang} className={styles.text}>
                        {lang}
                      </p>
                    );
                  })
                  : <p className={styles.text}>No languages</p>}
              </div>
            </div>
          </div>
          <div className={styles.borderCover}>
            <h2 className={styles.subHeading}>Border(s):</h2>
            {countryMatch.length > 0
              ? countryMatch.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={"/country/" + item.name.toLowerCase()}
                  >
                    <button className={styles.button}>{item.name}</button>
                  </Link>
                );
              })
              : "No borders"}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Details;