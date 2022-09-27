import Head from 'next/head';
import { useState } from 'react';
import { getHeroes } from '../service';
import { Heroes } from '../components/Heroes';
import { InferGetStaticPropsType } from 'next';

import styles from '../styles/Home.module.css';

export default function Home({
  heroes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState('');

  const filteredHero =
    search.length > 0
      ? heroes.filter((h) => h.localized_name.toLowerCase().includes(search))
      : [];

  return (
    <>
      <Head>
        <title>Dota 2 Cards</title>
      </Head>

      <div className={styles.container}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className={styles.input}
          placeholder="Search hero by name..."
        />

        <main className={styles.main}>
          {search.length > 0 ? (
            <Heroes listHero={filteredHero} />
          ) : (
            <Heroes listHero={heroes} />
          )}
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
