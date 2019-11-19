import React, { useEffect } from 'react';
import Deck from './server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from './components/table';
import Card from './components/card';
import Button from './components/button';

import * as actions from './action';

const Cards = (prop) => {

  const cardsArr = prop.cards.map(card => {
    return <li key={card.key}><Card card={card} /></li>
  })

  return (
    <ul>
      {cardsArr}
    </ul>
  )
}

const deck = new Deck();

const App = ({ cards, trump, enemyCards, setInitials, status, receiveCardFromServer, deckState, winner }) => {

  useEffect(() => {
    setInitials(deck);
    console.log('setting initials');
  }, [setInitials]);

  if (winner) {
    return <h1>{winner} win!</h1>
  }

  return (
    <div className="App">
      <Cards cards={enemyCards} />
      <Card card={trump} />
      <div>{deckState.length} cards left</div>
      <Cards cards={cards} />
      <Button title="Конец хода" />
      <Table />
    </div>
  );
}

const mapStateToPros = state => {
  return {
    cards: state.cards,
    trump: state.trump,
    enemyCards: state.enemyCards,
    status: state.status,
    deckState: state.deck,
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
