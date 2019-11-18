import React, { useEffect } from 'react';
import Deck from './server/deck';
import Logic from './server/logic';

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
const logic = new Logic();

const App = ({ setCards, сards, setTrump, trump, setWhatCanUse, status, setEnemyCards, enemyCards, tableToBeat, tableBeated }) => {

  useEffect(() => {
    setCards(deck.myCards);
    setEnemyCards(deck._enemyCards);
    setTrump(deck.getTrump());
    setWhatCanUse(deck.deck);
  }, [setCards, setEnemyCards, setTrump, setWhatCanUse, сards]);

  useEffect(() => {
    console.log('status has been changed');
    console.log(status);
    if (status === 'hold') {
      setTimeout(() => {
        const enemyCard = logic.enemyAction(enemyCards, trump, tableToBeat, tableBeated, status);
        console.log(enemyCard);
      }, 500);
    }

  }, [enemyCards, status, tableBeated, tableToBeat, trump]);

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
    trump: state.trump,
    status: state.status,
    enemyCards: state.enemyCards,
    tableToBeat: state.tableToBeat,
    tableBeated: state.tableBeated,

  }
}

const mapDispatchToProps = dispatch => {
  const { setCards, setTrump, setWhatCanUse, setEnemyCards } = bindActionCreators(actions, dispatch);

  return {
    setCards: (cards) => {
      setCards(cards)
    },

    setTrump: (trump) => {
      setTrump(trump);
    },

    setWhatCanUse: (whatCanUse) => {
      setWhatCanUse(whatCanUse);
    },

    setEnemyCards: (cards) => {
      setEnemyCards(cards);
    }
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
