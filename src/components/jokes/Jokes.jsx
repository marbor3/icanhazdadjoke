import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import DadJoke from "../../elements/dadjoke/DadJoke";
import DadJokes from "../../elements/dadjokes/DadJokes";
import useJokesDataSource from "./Jokes.dataSource";
import styles from "./Jokes.module.css";

const MemoizedDadJokes = React.memo(DadJokes);

export default function Jokes({ page }) {
  const [{ jokes, hasPrev, hasNext }, prevPage, nextPage] =
    useJokesDataSource(page);

  return (
    <>
      <MemoizedDadJokes jokes={jokes} />
      <div className={styles.jokes__pagination}>
        <button
          className={styles["jokes__pagination-button"]}
          onClick={prevPage}
          disabled={!hasPrev}
          data-testid="prev"
        >
          Previous
        </button>
        <button
          className={styles["jokes__pagination-button"]}
          onClick={nextPage}
          disabled={!hasNext}
          data-testid="next"
        >
          Next
        </button>
      </div>
    </>
  );
}
