import react, { useEffect, useState } from "react";
import styles from "./DadJoke.module.css";

export default function DadJoke({ joke }) {
  return <article className={styles.article}>{joke}</article>;
}
