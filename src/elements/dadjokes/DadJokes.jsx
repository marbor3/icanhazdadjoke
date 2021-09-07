import react, { useEffect, useState } from "react";
import DadJoke from "../dadjoke/DadJoke";
import styles from "./DadJokes.module.css";

export default function DadJokes({ jokes }) {
  return jokes && jokes.length ? (
    <ul className={styles.jokes}>
      {jokes.map((joke) => (
        <li
          data-testid="joke-list-item"
          key={joke.id}
          className={styles["jokes__list-item"]}
        >
          <DadJoke joke={joke.joke} />
        </li>
      ))}
    </ul>
  ) : null;
}
