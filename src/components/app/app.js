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

const App = ({ cards, trump, enemyCards, setInitials, winner }) => {

  useEffect(() => {
    setInitials(deckData);
    console.log('setting initials');
  }, [setInitials]);

  if (winner) {
    return <h1>{winner} win!</h1>
  }

  return (
    <div className={styles['app']}>
      <div className={styles['enemy']}>
        <Cards cards={enemyCards} type="enemy" />
      </div>
      <div className={styles['mid-table']} >
        <div className={styles['table']}>
          <Table />
        </div>
      </div>
      <div className={styles['deck']}>
        <Deck card={trump} />
      </div>
      <div className={styles['user-field']}>

        <div className={styles['user-cards']}>
          <Cards cards={cards} type="player" />
          <div className={styles['btn-action']}>
            <Button />
          </div>
        </div>

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
  const { setInitials } = bindActionCreators(actions, dispatch);

  return {
    setInitials: (deck) => {
      setInitials(deck);
    },
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
