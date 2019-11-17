import React, { useEffect } from 'react';
import Deck from './server/deck';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './action';

const Card = ({ card }) => {
  return <div>{card.name}</div>
}

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

const App = ({ setDeck, setTrump, setPlayersDecks, users }) => {

  useEffect(() => {
    setDeck();
    setPlayersDecks(users);
    setTrump();
  }, []);

  const deck = new Deck();
  const regDeck = deck.get52Deck();
  const shufeledDeck = deck.shuffle(regDeck);
  console.log(regDeck);
  console.log(shufeledDeck);

  const cardsToUser = [];
  shufeledDeck.forEach((card, i) => {
    if (i < 6) {
      cardsToUser.push(shufeledDeck.pop());
    }
  })

  console.log(shufeledDeck);


  return (
    <div className="App">
      <Cards cards={cardsToUser} />
      <Card card={shufeledDeck.pop()} />
      <Cards cards={cardsToUser} />
    </div>
  );
}

const mapStateToPros = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  const { setDeck, setTrump, setUsers } = bindActionCreators(actions, dispatch);

  const deck = new Deck();
  const regDeck = deck.get52Deck();
  const shufeledDeck = deck.shuffle(regDeck);

  return {
    setDeck: () => {
      setDeck(shufeledDeck);
    },

    setTrump: () => {
      const deck = [...shufeledDeck];
      setTrump(deck.pop());
      setDeck(deck);
    },

    setPlayersDecks: (users) => {
      const deck = [...shufeledDeck];

      // const usersDecks = {};

      // for (let i = 1; i <= users; i++) {
      //   for (let j = 0; j < 6; j++) {
      //     usersDecks
      //   }
      // }

      // setPlayersDecks(users);
    }
  }
}

export default connect(mapStateToPros, mapDispatchToProps)(App);
