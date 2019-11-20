import React, { useEffect } from 'react';
import Deck from './server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from './components/table';
import Trump from './components/trump';
import Button from './components/button';
import Cards from './components/cards';

import * as actions from './action';

const deck = new Deck();

const App = ({ cards, trump, enemyCards, setInitials, winner }) => {

  useEffect(() => {
    setInitials(deck);
    console.log('setting initials');
  }, [setInitials]);

  if (winner) {
    return <h1>{winner} win!</h1>
  }

  return (
    <div className="App">
      <Cards cards={enemyCards} type="enemy" />
      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        <Trump card={trump} />
        <Table />
      </div>
      <Cards cards={cards} type="player" />

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
