import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { getHeroBySlug, getHeroes } from "../../../services";
import { GetStaticPaths, InferGetStaticPropsType } from "next";

export default function Hero({
  hero,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Dota Cards | {hero.localized_name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.img}>
          <Image
            src={hero.img}
            alt={hero.localized_name}
            title={hero.localized_name}
            width={256}
            height={144}
          />
        </div>

        <div className={styles.title}>
          <h2>{hero.localized_name}</h2>
          <Image
            src={hero.icon}
            alt={hero.localized_name}
            title={hero.localized_name}
            width={32}
            height={32}
          />
        </div>

        <div className={styles.content}>
          <strong>
            <span>Attack type:</span> {hero.attack_type}
          </strong>
          <strong>
            <span>Roles:</span> {hero.roles}
          </strong>
        </div>

        <audio controls>
          <source src={hero.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Link href="/">
          <a className={styles.backToHome}>back to home</a>
        </Link>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const heroes = await getHeroes();

  const paths = heroes.map((hero) => ({
    params: {
      slug: hero.slug,
    },
  }));

  paths.length = 10;

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params!;

  const hero = await getHeroBySlug(slug);

  if (!hero) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { hero },
    revalidate: 60,
  };
};
