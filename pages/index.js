import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState } from 'react';
// import { uuid } from "uuid"

export const getStaticProps = async () => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  const sortedData = data.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    } else if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
  return {
    props: { countries: sortedData },
  };
};

const Home = ({ countries }) => {
  const [searchBar, setSearchBar] = useState('');
  const [dropDown, setDropDown] = useState('');

  const continentFilters = [
    {
      value: '', name: 'Filter by Region'
    },
    {
      value: 'Africa', name: 'Africa'
    },
    {
      value: 'America', name: 'America'
    },
    {
      value: 'Europe', name: 'Europe'
    },
    {
      value: 'Oceania', name: 'Oceania'
    },
    {
      value: 'Asia', name: 'Asia'
    },
  ]
  return (
    <div className={styles.container}>
      <Head>
        <title>Where in the world</title>
        <meta name="description" content="REST Countries API challenge provided by FrontEnd Mentor. Solution by Stephanie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <input type='search' name='search' placeholder='Find a country...' onChange={(e) => setSearchBar(e.target.value)} />
        </div>
        <div>
          <select name='filter' onChange={(e) => setDropDown(e.target.value)}>
            {continentFilters.map((filter) => {
                return (
                  <option key={filter.name} value={filter.value}>
                    {filter.name}
                  </option>
                )
              }
            )}
          </select>
        </div>
        {countries.filter((country) => {
          if (searchBar &&country.name.common.toLowerCase().includes(searchBar.toLowerCase()))
            {
              if (dropDown && dropDown == country.region) {
                return country;
              } else if (dropDown && dropDown != country.region) {
                return;
              }
              return country;
            } else if (!searchBar && dropDown && dropDown == country.region) {
                return country;
            } else if (!searchBar && !dropDown) {
                return country;
            }
          })
          .map((country) => {

        return(
            <Link href= {'/country/' + country.name.common.toLowerCase()} key={country.name.common}>
              <div>
              <Image src={country.flags.svg} alt="A country flag" width={128} height={77} />
                <div>
                  <h2>{country.name.common}</h2>
                </div>
                <div>
                  <h2>Population</h2>
                  <p>{country.population}</p>
                </div>
                <div>
                  <h2>Region</h2>
                  <p>{country.region}</p>
                </div>
                <div>
                  <h2>Capital</h2>
                  <p>{country.capital}</p>
                </div>
              </div>
            </Link>
            // {console.log(country.population)}
        );
        })}
      </main>
    </div>
  );
}

export default Home;
