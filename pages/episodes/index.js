import Image from "next/image";
import Link from "next/link";

import { API_BASE_URL } from "../../lib/constants";
import { getEpisodes } from "../../lib/episodes";

import styles from "./episodes.module.css";

function Episode({ episode: { title, image_url, slug }, ...other }) {
  return (
    <Link href={`/episodes/${slug}`}>
      <a>
        <article {...other}>
          <div className={styles.thumbnail}>
            <Image src={image_url} width={180} height={180} objectFit="cover" />
          </div>
          <h1>{title}</h1>
        </article>
      </a>
    </Link>
  );
}

export default function Episodes({ episodes }) {
  return (
    <ol className={styles.list}>
      {episodes.map((ep) => (
        <li key={ep.title}>
          <Episode className={styles.episode} episode={ep} />
        </li>
      ))}
    </ol>
  );
}

export async function getServerSideProps(context) {
  const episodes = await getEpisodes();

  return {
    props: {
      episodes,
    },
  };
}
