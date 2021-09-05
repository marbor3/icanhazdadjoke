import { useRouter } from "next/router";
import react, { useCallback, useEffect, useState } from "react";
import DadJoke from "../../elements/dadjoke/DadJoke";
import styles from "./Jokes.module.css";

export default function Jokes({ page }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);
  const [jokes, setJokes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const prevPage = useCallback(
    function () {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        router.push(`/?page=${currentPage - 1}`, undefined, { shallow: true });
      }
    },
    [currentPage, router]
  );

  const nextPage = useCallback(
    function () {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        router.push(`/?page=${currentPage + 1}`, undefined, { shallow: true });
      }
    },
    [currentPage, totalPages, router]
  );

  useEffect(() => {
    fetch(`https://icanhazdadjoke.com/search?limit=3&page=${currentPage}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const json = await response.json();

        setJokes(json.results);
        setTotalPages(json.total_pages);

        return json;
      })
      .catch((e) => {
        console.log("e");
      });
  }, [currentPage]);

  return (
    <>
      <ul className={styles.jokes}>
        {jokes.map((joke) => (
          <li key={joke.id} className={styles["jokes__list-item"]}>
            <DadJoke joke={joke.joke} />
          </li>
        ))}
      </ul>
      <div className={styles.jokes__pagination}>
        <button
          className={styles["jokes__pagination-button"]}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={styles["jokes__pagination-button"]}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
