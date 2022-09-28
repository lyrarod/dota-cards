import Head from "next/head";
import { useState } from "react";
import { getHeroes } from "../../services";
import { Heroes } from "../components/Heroes";
import { InferGetStaticPropsType } from "next";

import styles from "../styles/Home.module.css";

export default function Home({
  heroes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState("");

  const filteredHeroes =
    search.length > 0
      ? heroes.filter((h) => h.localized_name.toLowerCase().includes(search))
      : heroes;

  return (
    <>
      <Head>
        <title>Dota Cards</title>
      </Head>

      <div className={styles.container}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className={styles.input}
          placeholder="Search hero by name..."
        />

        <main className={styles.main}>
          {<Heroes listHero={filteredHeroes} />}
        </main>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const heroes = await getHeroes();

  return {
    props: { heroes },
  };
};
