type HeroProps = {
  id: number;
  img: string;
  icon: string;
  slug: string;
  audio: string;
  roles: string[];
  attack_type: string;
  localized_name: string;
};

type ListHero = Omit<HeroProps, "roles"> & {
  roles: string;
};

export type ListHeroProps = {
  listHero: ListHero[];
};

export const getHeroes = async () => {
  const res = await fetch("https://api.opendota.com/api/heroStats");
  const data: HeroProps[] = await res.json();

  const formattedData = data.map((hero) => {
    //SLUG
    const slug = hero.localized_name
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .toLowerCase();

    //AUDIO
    const audio = `/assets/audio/${slug}/${slug}.mpeg`;

    return {
      slug,
      audio,
      id: hero.id,
      img: hero.img,
      icon: hero.icon,
      roles: hero.roles.join(", "),
      attack_type: hero.attack_type,
      localized_name: hero.localized_name,
    };
  });

  return formattedData;
};

export const getHeroBySlug = async (slug: string) => {
  const heroes = await getHeroes();
  const hero = heroes.find((hero) => hero.slug.includes(slug));

  return hero;
};
