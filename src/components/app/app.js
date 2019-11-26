import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from '../table';
import Deck from '../deck';
import Cards from '../cards';
import EnemyCards from '../enemy-cards';
import Button from '../button';

import * as actions from '../../actions';
import styles from './app.module.css';

const App = ({ cards, trump, setInitials, winner, setCardSize }) => {

  useEffect(() => {
    setInitials(window.innerWidth);
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
        <EnemyCards />
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
