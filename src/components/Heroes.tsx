import Link from "next/link";
import Image from "next/image";
import { ListHeroProps } from "../../services";
import styles from "../styles/Home.module.css";

export const Heroes = ({ listHero }: ListHeroProps) => {
  return (
    <>
      {listHero.map((hero) => (
        <Link href={`hero/${hero.slug}`} key={hero.id}>
          <a>
            <div className={styles.card}>
              <Image
                src={hero.img}
                alt={hero.localized_name}
                title={hero.localized_name}
                width={"140"}
                height={"78.75"}
                priority
              />
              <h3>{hero.localized_name}</h3>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
};
