import axios from "axios";

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
}

const Details = ({ country }) => {
  return (
    <>
      <h1>Country Details</h1>
      <h1>{ country.name.common }</h1>
    </>
  )
}

export default Details;