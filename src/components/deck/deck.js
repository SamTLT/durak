import React from "react";
import Card from "../card";

import styles from "./deck.module.css";

const Deck = ({ trump, cardsLeft }) => {
  const cardsLeftToShow = cardsLeft => {
    return <div className={styles["cards-left"]}>{cardsLeft}</div>;
  };

  return (
    <div className="deck">
      <div className={styles["deck-full"]}>
        <div className={`${styles["deck-closed"]}`}>
          {cardsLeft > 1 ? <Card card={trump} type="back" /> : null}
          {cardsLeft <= 1 ? (
            <div className={styles["hidden"]}>
              <Card card={trump} type="back" />
            </div>
          ) : null}
        </div>
        <div className={styles["trump"]}>
          {cardsLeft > 0 ? <Card card={trump} type="trump" /> : null}
          {cardsLeft === 0 ? <Card card={trump} type={trump.type} /> : null}
          {cardsLeft > 1 ? cardsLeftToShow(cardsLeft) : null}
        </div>
      </div>
    </div>
  );
};

export default Deck;
