import React, { useEffect } from 'react';
import Deck from './server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from './components/table';
import Card from './components/card';

import * as actions from './action';

const Cards = (prop) => {

  const cardsArr = prop.cards.map(card => {
    return <li><Card card={card} /></li>
  })

  return (
    <ul>
      {cardsArr}
    </ul>
  )
}

const deck = new Deck();

const App = ({ setCards, сards, setTrump, trump }) => {

  useEffect(() => {
    setCards(deck.myCards);
    setTrump(deck.getTrump());
  }, []);

  console.log(deck.cardsLeft());
  console.log(deck.getTrump());
  console.log(deck._enemyCards);
  console.log(сards);

  return (
    <div className="App">
      <Cards cards={deck._enemyCards} />
      <Card card={trump} />
      <Cards cards={сards} />
      <div>{deck.cardsLeft()}</div>
      <Table />
    </div>
  );
}

const mapStateToPros = state => {
  return {
    сards: state.сards,
    trump: state.trump
  }
}

const mapDispatchToProps = dispatch => {
  const { setCards, setTrump } = bindActionCreators(actions, dispatch);

  return {
    setCards: (cards) => {
      setCards(cards)
    },

    setTrump: (trump) => {
      setTrump(trump);
    }
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
