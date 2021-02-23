import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

export default function Home({ rockets }) {
  console.log("rockets: ", rockets);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SPACE - X Rockets</h1>

        <p className={styles.description}>
          Lates launches rokets from SPACE - X
        </p>

        <div className={styles.grid}>
          {rockets.map((rocket) => {
            return (
              <a
                href="https://nextjs.org/docs"
                className={styles.card}
                key={rocket.id}
              >
                <h3>{rocket.name}</h3>
                <h4>{rocket.country}</h4>

                <p>{rocket.description}</p>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetRockets {
        rockets(limit: 10) {
          active
          company
          country
          description
          id
          name
          type
          diameter {
            meters
          }
          mass {
            kg
          }
        }
      }
    `,
  });

  return {
    props: {
      rockets: data.rockets,
    },
  };
}
