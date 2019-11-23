import React, { useEffect } from 'react';
import DeckServise from '../../server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from '../table';
import Deck from '../deck';
import Cards from '../cards';
import Button from '../button';

import * as actions from '../../actions';
import styles from './app.module.css';

const deckData = new DeckServise();

const App = ({ cards, trump, enemyCards, setInitials, winner, setCardSize }) => {

  useEffect(() => {
    setInitials(deckData, window.innerWidth);
    console.log('setting initials');
  }, [setInitials]);

  // checking window width
  window.addEventListener("resize", function () {
    setCardSize(window.innerWidth);
  });

  if (winner) {
    return <h1>{winner} win!</h1>
  }

  return (
    <div className={styles['app']}>
      <div className={styles['enemy']}>
        <Cards cards={enemyCards} type="enemy" />
      </div>
      <div className={styles['table']}>
        <Table />
      </div>
      <div className={styles['deck']}>
        <Deck card={trump} />
      </div>
      <div className={styles['user-cards']}>
        <Cards cards={cards} type="player" />
      </div>
      <div className={styles['btn-action']}>
        <Button />
      </div>



    </div >
  );
}

const mapStateToPros = state => {
  return {
    cards: state.cards,
    trump: state.trump,
    enemyCards: state.enemyCards,
    status: state.status,
    winner: state.winner
  }
}

const mapDispatchToProps = dispatch => {
  const { setInitials, processCardSize } = bindActionCreators(actions, dispatch);

  return {
    setInitials: (deck, width) => {
      setInitials(deck, width);
    },
    setCardSize: (width) => {
      processCardSize(width);
    }
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
