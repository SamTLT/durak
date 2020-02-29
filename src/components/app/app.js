import React, { useEffect } from "react";

import Table from "components/table";
import Deck from "components/deck";
import Cards from "components/cards";
import EnemyCards from "components/enemy-cards";
import Button from "components/button";

import styles from "./app.module.css";
import "./app.css";

const App = ({ cards, trump, setInitials, winner, setCardSize }) => {
  useEffect(() => {
    setInitials(window.innerWidth);
    console.log("setting initials");
  }, [setInitials]);

  // checking window width
  window.addEventListener("resize", function() {
    setCardSize(window.innerWidth);
  });

  if (winner) {
    return <h1>{winner} wins!</h1>;
  }

  return (
    <div className={styles["app"]}>
      <div className={styles["enemy"]}>
        <EnemyCards />
      </div>
      <div className={styles["table"]}>
        <Table />
      </div>
      <div className={styles["deck"]}>
        <Deck card={trump} />
      </div>
      <div className={styles["user-cards"]}>
        <Cards cards={cards} type="player" />
      </div>
      <div className={styles["btn-action"]}>
        <Button />
      </div>
    </div>
  );
};

export default App;
