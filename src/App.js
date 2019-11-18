import React, { useEffect } from 'react';
import Deck from './server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from './components/table';
import Card from './components/card';

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

const App = ({ cards, trump, enemyCards, setInitials }) => {

  useEffect(() => {
    setInitials(deck);
    console.log('setting initials');
  }, [setInitials]);

  return (
    <div className="App">
      <Cards cards={enemyCards} />
      <Card card={trump} />
      <Cards cards={cards} />
      <div>{deck.cardsLeft()}</div>
      <Table />
    </div>
  );
}

const mapStateToPros = state => {
  return {
    cards: state.cards,
    trump: state.trump,
    enemyCards: state.enemyCards
  }
}

const mapDispatchToProps = dispatch => {
  const { setInitials } = bindActionCreators(actions, dispatch);

  return {
    setInitials: (deck) => {
      setInitials(deck);
    }
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
